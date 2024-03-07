import {Component, EventEmitter, Input, Output} from '@angular/core';
import {AddressFormConfig} from '@account/model';
import {Address} from 'ngx-google-places-autocomplete/objects/address';
import {isNil} from 'lodash';

@Component({
  selector: 'app-address-item',
  templateUrl: './address-item.component.html',
  styleUrls: ['./address-item.component.scss', '../account-identity-part/account-identity-part.component.scss']
})
export class AddressItemComponent {
  @Input() address!: AddressFormConfig;
  @Input() index!: number;
  @Output() setError = new EventEmitter<string[]>();
  @Output() sendRemove = new EventEmitter<number>();
  showResult: boolean = false;
  options: any = {
    mapTypeId: 'hybrid',
    zoomControl: false,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 15,
    minZoom: 8,
  }
  center: google.maps.LatLngLiteral = {
    lat: 50.499527,
    lng: 4.475403
  };
  zoom = 6;
  markers: any[] = []

  ngOnInit(): void {
    console.log('my address', this.address);
    this.showMarker();
  }

  showMarker(): void {
    this.showResult = false;
    if (!isNil(this.address.longitude) && !isNil(this.address.latitude) && this.address.longitude != '0' && this.address.latitude != '0') {
      this.showResult = true;
      this.options = {
        mapTypeId: 'hybrid',
        zoomControl: false,
        scrollwheel: false,
        disableDoubleClickZoom: true,
        maxZoom: 15,
        minZoom: 8,
      }
      this.center = {
        lat: parseFloat(this.address.latitude),
        lng: parseFloat(this.address.longitude),
      }
      this.zoom = 12;
      this.markers = [{
        position: {
          lat: parseFloat(this.address.latitude),
          lng: parseFloat(this.address.longitude),
        },
        title: 'Mon adresse',
      }];
    }
  }

  handleAddressChange(address: Address) {
    if (address.address_components.length === 7) {
      this.address.latitude = address.geometry.location.lat().toString();
      this.address.longitude = address.geometry.location.lng().toString();
      this.address.nb.formControl.patchValue(address.address_components[0].long_name);
      this.address.road.formControl.patchValue(address.address_components[1].long_name);
      this.address.town.formControl.patchValue(address.address_components[2].long_name);
      this.address.country.formControl.patchValue(address.address_components[5].long_name);
      this.address.cp.formControl.patchValue(address.address_components[6].long_name);
      this.address.longitude = address.geometry.location.lng().toString();
      this.showMarker();
    } else {
      this.setError.emit(['Pour valider votre adresse, veuillez encoder la rue, le numéro, le code postal ainsi que la ville']);
    }
  }

  remove(): void {
    this.sendRemove.emit(this.index);
  }
}
