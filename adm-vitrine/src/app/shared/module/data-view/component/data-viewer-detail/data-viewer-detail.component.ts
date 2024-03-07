import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {BehaviorSubject, of, Subject, switchMap} from 'rxjs';
import {isNil} from 'lodash';
import {Helper} from '@shared/contract';
import {map, takeUntil, tap} from 'rxjs/operators';
import {CrudService} from '@shared/service/crud.service';
import {AppPageEnum, AppPageTitleEnum, Business, DetailForm, Payload} from '@shared/model';
import {NavigationService} from '@shared/service';
import {FormType} from '@shared/module/form/model/enum';

@Component({
    template: ''
})
export class DataViewerDetailComponent<BUSINESS, DTO, DETAIL_FORM_CONFIG> implements OnInit, OnDestroy {
    helper!: Helper<BUSINESS, DTO, DETAIL_FORM_CONFIG>
    formMode!: FormType;
    detail$!: BehaviorSubject<BUSINESS>;
    loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    detailFormConfig!: DETAIL_FORM_CONFIG;
    destroyer$ = new Subject<void>();
    needToSave$ = new Subject<boolean>();

    constructor(public activateRouter: ActivatedRoute, public navigationService: NavigationService, public dataService: CrudService<BUSINESS, DTO, string, Payload, Payload, DetailForm>) {
    }

    ngOnInit(): void {
        this.detail$ = new BehaviorSubject<BUSINESS>(this.helper.getEmpty());
        this.needToSave$.pipe(
            takeUntil(this.destroyer$),
            tap((needToSave: boolean) => this.genActions(needToSave, this.helper.getEmpty()))
        ).subscribe()
        this.activateRouter.params.pipe(
            switchMap((param: Params) => {
                if (isNil(param['id'])) {
                    return of(this.helper.getEmpty())
                }
                return this.dataService.detail(param['id'])
            }),
            tap((business: BUSINESS) => {
                this.genDetailConfig(business);
                this.genActions(false, business);
                const label = (this.formMode === FormType.CREATE) ? '_CREATE' : '_DETAIL';
                this.navigationService.title$.next({
                    label: `${AppPageTitleEnum[this.dataService.entityName + label as keyof typeof AppPageTitleEnum]}`,
                    params: business
                })
                this.detail$.next(business);
                this.loading$.next(false)
            })
        ).subscribe()
    }

    ngOnDestroy(): void {
        this.destroyer$.next();
        this.destroyer$.complete();
    }

    public add(): void {
        this.navigationService.navigate(AppPageEnum[this.dataService.entityName + '_CREATE' as keyof typeof AppPageEnum]);
    }

    public delete(business:BUSINESS): void {

        this.dataService.remove((business as Business).id).subscribe((deleted:boolean)=>{
            if(deleted){
                this.navigationService.navigate(AppPageEnum[this.dataService.entityName + '_HOME' as keyof typeof AppPageEnum]);
            }
        });
    }

    public save(): void {
        let sub = null;
        if (this.formMode === FormType.CREATE) {
            sub = this.dataService.create(this.helper.formConfigToCreatePayload(this.detailFormConfig));
        } else if (this.formMode === FormType.UPDATE) {
            sub = this.dataService.update(this.helper.formConfigToUpdatePayload(this.detail$.getValue(), this.detailFormConfig));
        }
        if (!isNil(sub)) {
            sub.pipe(
                map((data: BUSINESS) => data as unknown as Business),
                tap((data: Business) => {
                    this.needToSave$.next(false);
                    if (!data.isEmpty) {
                        this.dataService.list();
                        this.navigationService.navigate(`${AppPageEnum[this.dataService.entityName + '_DETAIL' as keyof typeof AppPageEnum]}/${data.id}`);
                    }
                })
            ).subscribe();
        }

    }

    private genDetailConfig(business: BUSINESS): void {
        this.detailFormConfig = this.helper.toDetailConfig(business);
        (this.detailFormConfig! as unknown as DetailForm).formGroup!.valueChanges.pipe(
            takeUntil(this.destroyer$),
            tap(() => this.needToSave$.next(true))
        ).subscribe();
    }

    private genActions(needSave: boolean, business: BUSINESS): void {
        let items = [
            {
                icon: 'fa-regular fa-plus',
                label: {label: 'common.add'},
                callback: this.add,
                css: 'primary-btn',
                navigationService: this.navigationService,
                dataService: this.dataService,
                data:business
            },
            {
                icon: 'fa-regular fa-trash-alt',
                label: {label: 'common.delete'},
                callback: this.delete,
                css: 'delete-btn',
                navigationService: this.navigationService,
                dataService: this.dataService,
                data:business
            }
        ]
        this.navigationService.actions$.next(items);
    }

}
