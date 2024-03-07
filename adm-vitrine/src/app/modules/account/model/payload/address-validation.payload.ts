export interface AddressValidationPayload{
  address: AddressValidationData;
}
export interface AddressValidationData{
  regionCode: AddressValidationEnum;
  locality: string;
  postalCode: string;
  addressLines: string[];
}

export enum AddressValidationEnum{
  BE='BE',
  DE='DE',
  FR='FR',
  LU='LU',
  NL='NL'
}
