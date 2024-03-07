import {AddressValidationEnum} from '@account/model';

export interface AddressValidationResponse {
  result: {
    verdict: {
      inputGranularity: ResponseGranularity,
      validationGranularity: ResponseGranularity,
      geocodeGranularity: ResponseGranularity,
      addressComplete: boolean,
      hasUnconfirmedComponents: boolean,
      hasInferredComponents: boolean
    },
    address: {
      formattedAddress: string,
      postalAddress: {
        regionCode: AddressValidationEnum,
        languageCode: string,
        postalCode: number,
        locality: string,
        addressLines: string[]
      },
      addressComponents: ComponentResponse[],
      unconfirmedComponentTypes: string[]
    },

  };
  responseId: string;
}
export interface ComponentResponse{
  componentName: any,
  componentType: string,
  confirmationLevel: ComponentConfirmation
}
export enum ComponentConfirmation {
  CONFIRMATION_LEVEL_UNSPECIFIED = 'CONFIRMATION_LEVEL_UNSPECIFIED',
  CONFIRMED = 'CONFIRMED',
  UNCONFIRMED_BUT_PLAUSIBLE = 'UNCONFIRMED_BUT_PLAUSIBLE',
  UNCONFIRMED_AND_SUSPICIOUS = 'UNCONFIRMED_AND_SUSPICIOUS'
}

export enum ResponseGranularity {
  GRANULARITY_UNSPECIFIED = 'GRANULARITY_UNSPECIFIED',
  SUB_PREMISE = 'SUB_PREMISE',
  PREMISE = 'PREMISE',
  PREMISE_PROXIMITY = 'PREMISE_PROXIMITY',
  BLOCK = 'BLOCK',
  ROUTE = 'ROUTE',
  OTHER = 'OTHER',
}
