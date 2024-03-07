import {Payload} from '@shared/model';

export interface Helper<BUSINESS, DTO, DETAIL_FORM_CONFIG> {
    fromDTO(dto: DTO): BUSINESS;

    toDTO(business: BUSINESS): DTO;

    getEmpty(): BUSINESS;

    toDetailConfig(business: BUSINESS): DETAIL_FORM_CONFIG;

    formConfigToCreatePayload(detailFormConfig: DETAIL_FORM_CONFIG): Payload;

    formConfigToUpdatePayload(business: BUSINESS, detailFormConfig: DETAIL_FORM_CONFIG): Payload;
}