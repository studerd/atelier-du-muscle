import {Helper} from '@shared/contract';
import {
  Product,
  ProductCreatePayload,
  ProductDetailFormConfig,
  ProductDto,
  ProductImageDto,
  ProductOptionDto,
  ProductUpdatePayload
} from '@product/model';
import {FormControl, FormGroup} from '@angular/forms';
import {FormType} from '@shared/module/form/model/enum';
import {ProductOptionHelper} from '@product/helper/product-option.helper';
import {ProductImageHelper} from '@product/helper/product-image.helper';

class ProductHelper implements Helper<Product, ProductDto, ProductDetailFormConfig> {
  getPayload(business: Product, detailFormConfig: ProductDetailFormConfig, formMode: FormType): ProductCreatePayload | ProductUpdatePayload {
    return formMode === FormType.UPDATE ? this.formConfigToUpdatePayload(business, detailFormConfig) : this.formConfigToCreatePayload(detailFormConfig);
  }

  formConfigToCreatePayload(detailFormConfig: ProductDetailFormConfig): ProductCreatePayload {
    return {
      capacity: detailFormConfig.capacity.formControl.value,
      countCapacity: detailFormConfig.countCapacity.formControl.value,
      delays: detailFormConfig.delays.formControl.value,
      options: [], pictures: [],
      price: detailFormConfig.price.formControl.value,
      title: detailFormConfig.title.formControl.value,
      characteristic: '',
      description: '',
      technicalData: '',
      complement: '',
      hook: '',
      draft: detailFormConfig.draft.formControl.value,
      visible: detailFormConfig.visible.formControl.value,
      small: detailFormConfig.small.formControl.value,
      costTravel: detailFormConfig.costTravel.formControl.value
    }
  }

  formConfigToUpdatePayload(business: Product, detailFormConfig: ProductDetailFormConfig): ProductUpdatePayload {
    return {
      product_id: business.id,
      capacity: detailFormConfig.capacity.formControl.value,
      countCapacity: detailFormConfig.countCapacity.formControl.value,
      delays: detailFormConfig.delays.formControl.value,
      options: [], pictures: [],
      price: detailFormConfig.price.formControl.value,
      title: detailFormConfig.title.formControl.value,
      characteristic: '',
      description: '',
      technicalData: '',
      complement: '',
      hook: '',
      draft: detailFormConfig.draft.formControl.value,
      visible: detailFormConfig.visible.formControl.value,
      small: detailFormConfig.small.formControl.value,
      costTravel: detailFormConfig.costTravel.formControl.value

    }
  }

  fromDTO(dto: ProductDto): Product {

    return {
      capacity: dto.capacity,
      countCapacity: dto.capacity,
      delays: dto.delays,
      description: dto.description,
      id: dto.product_id,
      isEmpty: false,
      options: dto.options.map((o: ProductOptionDto) => ProductOptionHelper.fromDTO(o)),
      pictures: dto.pictures.sort((a:ProductImageDto,b:ProductImageDto)=> a.position - b.position).map((p: ProductImageDto) => ProductImageHelper.fromDTO(p)),
      price: dto.price,
      str: dto.title,
      title: dto.title,
      characteristic: dto.characteristic,
      complement: dto.complement,
      technicalData: dto.technicalData,
      hook: dto.hook,

      draft: dto.draft,
      visible: dto.visible,
      small: dto.small,
      costTravel: dto.costTravel
    }
  }

  getEmpty(): Product {
    return {
      costTravel: 0, small: false,
      draft: true, visible: false,
      characteristic: '', complement: '', technicalData: '',
      capacity: 0,
      countCapacity: 0,
      delays: '',
      description: '',
      id: '',
      isEmpty: true,
      options: [],
      pictures: [],
      price: 0,
      str: '',
      title: '',
      hook: ''
    }
  }

  toDTO(business: Product): ProductDto {
    return {
      capacity: business.capacity,
      countCapacity: business.capacity,
      delays: business.delays,
      description: business.description,
      product_id: business.id,
      options: [],
      pictures: [],
      price: business.price,
      title: business.title,
      hook: business.hook,
      characteristic: business.characteristic,
      complement: business.complement,
      technicalData: business.technicalData,
      draft: business.draft,
      visible: business.visible,
      small: business.small,
      costTravel: business.costTravel
    }
  }

  toDetailConfig(business: Product): ProductDetailFormConfig {
    const formGroup = new FormGroup({
      capacity: new FormControl(business.capacity),
      countCapacity: new FormControl(business.capacity),
      delays: new FormControl(business.delays),
      description: new FormControl(business.description),

      price: new FormControl(business.price),
      title: new FormControl(business.title),
      draft: new FormControl(business.draft),
      visible: new FormControl(business.visible),
      small: new FormControl(business.small),
      costTravel: new FormControl(business.costTravel)
    });
    const translateKey = 'page.product-detail.';
    return {
      formGroup: formGroup,
      capacity: {
        name: 'capacity',
        type: 'text',
        translateKey: translateKey,
        formControl: (formGroup.get('capacity')!) as unknown as FormControl
      },
      countCapacity: {
        name: 'countCapacity',
        type: 'text',
        translateKey: translateKey,
        formControl: (formGroup.get('countCapacity')!) as unknown as FormControl
      },
      delays: {
        name: 'delays',
        type: 'text',
        translateKey: translateKey,
        formControl: (formGroup.get('delays')!) as unknown as FormControl
      },
      description: {
        name: 'description',
        type: 'text',
        translateKey: translateKey,
        formControl: (formGroup.get('description')!) as unknown as FormControl
      },
      price: {
        name: 'price',
        type: 'text',
        translateKey: translateKey,
        formControl: (formGroup.get('price')!) as unknown as FormControl
      },
      title: {
        name: 'title',
        type: 'text',
        translateKey: translateKey,
        formControl: (formGroup.get('title')!) as unknown as FormControl
      },
      draft: {
        name: 'draft',
        type: 'boolean',
        translateKey: translateKey,
        formControl: (formGroup.get('draft')!) as unknown as FormControl
      },
      visible: {
        name: 'visible',
        type: 'boolean',
        translateKey: translateKey,
        formControl: (formGroup.get('visible')!) as unknown as FormControl
      },
      small: {
        name: 'small',
        type: 'boolean',
        translateKey: translateKey,
        formControl: (formGroup.get('small')!) as unknown as FormControl
      },
      costTravel: {
        name: 'costTravel',
        type: 'text',
        translateKey: translateKey,
        formControl: (formGroup.get('costTravel')!) as unknown as FormControl
      }

    }
  }

}

export const productHelper = new ProductHelper();
