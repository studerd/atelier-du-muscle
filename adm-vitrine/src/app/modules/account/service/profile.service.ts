import {Injectable} from '@angular/core';
import {CrudService} from '@shared/service/crud.service';
import {
  AddressValidationPayload,
  AddressValidationResponse,
  Profile,
  ProfileCreatePayload,
  ProfileDetailFormConfig,
  ProfileDto,
  ProfileUpdatePayload,
  VatCheck
} from '@account/model';
import {profileHelper} from '@account/helper/profile.helper';
import {Observable, of, switchMap} from 'rxjs';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService extends CrudService<Profile, ProfileDto, string, ProfileCreatePayload, ProfileUpdatePayload, ProfileDetailFormConfig> {
  override helper = profileHelper;
  override entityName = 'PROFILE';
  addressValidationAPI = 'https://addressvalidation.googleapis.com/v1:validateAddress?key=AIzaSyCSHhD0rHhjAhcx-H7axcdhEJu52yUm3bM';

  checkVat(vatNumber: string): Observable<VatCheck> {
    const regex = /^((BE)(0\d{9})|(DE)(\d{9})|(FR)([\dA-Z]{2}\d{9})|(LU)(\d{8})|(NL)(\d{9}(B\d{2}|BO2)))$/igm

    return of(regex.test(vatNumber)).pipe(
      switchMap((success: boolean) => {
        console.log('test', success);
        if (success) {
          return this.http.get('https://api.vatcheckapi.com/v2/check?vat_number=' + vatNumber + '&apikey=iCpm0OsiZxFp5GUza4XVQ8t2jkAtvsAijDHDVNfd')
        }
        return of({

          country_code: '',
          vat_number: '',
          format_valid: false,
          checksum_valid: false
        });
      })
    )
    /*
    this.http.get('https://api.vatcheckapi.com/v2/check?vat_number=' + vatNumber + '&apikey=iCpm0OsiZxFp5GUza4XVQ8t2jkAtvsAijDHDVNfd').subscribe((data) => {
      console.log('data', data);
    })*/
  }
  addressAutoComplete(road:string):Observable<any>{
    return this.http.get('https://maps.googleapis.com/maps/api/place/autocomplete/json?input=Rue du calvaire 49, 4800&language=fr&types=geocode&key=AIzaSyCvbcq4yrkzr_Kn2II3Ax8-qZKu9Uyd9NE');
}
  checkAddress(data: AddressValidationPayload): Observable<string[]> {
    return this.http.post(this.addressValidationAPI, data).pipe(
      tap(result => console.log(result)),
      map((validation: AddressValidationResponse) => validation.result.address.unconfirmedComponentTypes)
    )
      ;
  }
}
