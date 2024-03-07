import {Component, ViewEncapsulation} from '@angular/core';
import {Product, ProductOption, ProductOptionGroup} from '@product/model';
import {Order, OrderLine} from '@order/model';
import {OrderHelper} from '@order/helper';
import {ActivatedRoute, Params} from '@angular/router';
import {OrderService} from '@order/service/order.service';
import {isNil} from 'lodash';
import {ProductOptionHelper} from '@product/helper/product-option.helper';
import {productHelper} from '@product/helper';
import {BehaviorSubject, of, switchMap} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ProductService} from '@product/service/product.service';

@Component({
  selector: 'app-product-detail-page',
  templateUrl: './product-detail-page.component.html',
  styleUrls: ['./product-detail-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProductDetailPageComponent {
  detail$: BehaviorSubject<Product> = new BehaviorSubject<Product>(productHelper.getEmpty());
  product: Product = productHelper.getEmpty();
  totalPrice = '0';
  count = 1;
  bulletPoints: string[] = [];
  options: ProductOptionGroup[] = [];
  bucket: Order = OrderHelper.getEmpty();
  currentPicture: string = '';
  activeTab = 0;
  content = '';
  canAdd = true;

  constructor(public activatedRouter: ActivatedRoute, public orderService: OrderService, public productService: ProductService) {
  }

  ngOnInit(): void {
    this.activatedRouter.params.pipe(
      switchMap((param: Params) => {
        if (!isNil(param['id'])) {
          return this.productService.detail(param['id']);
        }
        return of(productHelper.getEmpty());
      }),
      tap((product: Product) => {
        this.detail$.next(product);
        this.product = product;
        this.content = this.product.description;

        if (this.product.pictures.length > 0) {
          this.currentPicture = this.product.pictures[0].content;
        }
        this.orderService.initBucket();
        this.totalPrice = this.product.price + '€';
        this.bulletPoints = (isNil(this.product.hook)) ? [] : this.product.hook.trim().length === 0 ? [] : this.product.hook.split(']').filter((h: string) => h.length > 0).map((h: string) => h.replace('[', ''));
        this.options = ProductOptionHelper.flatToGroup(this.product.options);
        if (this.options.length > 0) {
          this.canAdd = false;
        }
      })
    ).subscribe();
    this.orderService.bucket$.subscribe((bucket: Order) => {
      this.bucket = bucket;
    });
  }

  addBucket(): void {
    let base = this.product.price;
    const optionsSelected: ProductOption[] = this.getSelectedOption();
    const uniqueIdentifier = ProductOptionHelper.toUniqueIdentifierOption(optionsSelected);
    for (const option of optionsSelected) {
      base += option.price;
    }
    const findSames: OrderLine | undefined = this.bucket.lines.find((l: OrderLine) => l.product.id === this.product.id && l.uniqueOptionIdentifer === uniqueIdentifier);
    if (isNil(findSames)) {
      this.bucket.lines.push({
        id: '', isEmpty: false, str: this.getLineStr(),
        product: this.product,
        options: optionsSelected,
        totalPrice: (base * this.count),
        qty: this.count,
        uniqueOptionIdentifer: uniqueIdentifier
      });
    } else {
      findSames.qty = findSames.qty + this.count;
      findSames.totalPrice = (base * findSames.qty);
    }
    this.orderService.updateBucket(this.bucket, true);
  }

  minus(): void {
    if (this.count > 1) {
      this.count--;
      this.calculatePrice();
    }
  }

  add(): void {
    this.count++;
    this.calculatePrice();
  }

  select(options: ProductOptionGroup, value: ProductOption) {
    options.options.forEach(o => o.selected = false);
    value.selected = true;
    this.canAdd = true;
    this.calculatePrice();
  }

  setCurrentPicture(content: string) {
    this.currentPicture = content;

  }

  setActiveTab(number: number): void {
    this.activeTab = number;
    if (this.activeTab == 0) {
      this.content = this.product.description;
    } else if (this.activeTab == 1) {
      this.content = this.product.characteristic;
    } else {
      this.content = this.product.technicalData;
    }

  }

  private getSelectedOption(): ProductOption[] {
    return this.options.map((options: ProductOptionGroup) => options.options).flat().filter((a: ProductOption) => a.selected);
  }

  private calculatePrice(): void {
    let base = this.product.price;
    const optionsSelected = this.getSelectedOption();
    for (const option of optionsSelected) {
      base += option.price;
    }
    this.totalPrice = (base * this.count) + '€';
  }

  private getLineStr(): string {
    const options = this.options.filter((options: ProductOptionGroup) => {
      return options.options.filter((a: ProductOption) => a.selected).length > 0
    })
    return this.count + ' ' + this.product.str + ((options.length === 0) ? '' : '(' + options.map((o: ProductOptionGroup) => o.title) + ')');
  }
}
