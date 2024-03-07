import {ProductOption, ProductOptionDto, ProductOptionGroup} from '@product/model';

export class ProductOptionHelper {

    public static fromDTO(dto: ProductOptionDto): ProductOption {
        return {
            description: dto.description,
            id: dto.product_option_id,
            isEmpty: false,
            percentMore: dto.percentMore,
            price: dto.price,
            product_option_id: dto.product_option_id,
            samePriceAsParent: dto.samePriceAsParent,
            selected: false,
            str: dto.description,
            title: dto.title,
            type: dto.type

        }
    }

    public static getEmpty(): ProductOption {
        return {
            description: '',
            id: '',
            isEmpty: true,
            percentMore: 0,
            price: 0,
            product_option_id: '',
            samePriceAsParent: false,
            str: '',
            title: '',
            type: '',
            selected: false
        }
    }

    public static getNewOption(): ProductOptionGroup {
        return {
            title: '', options: [],
            newOptionForm: ProductOptionHelper.getEmpty()
        };
    }

    public static groupToFlat(group: ProductOptionGroup[], price: number): ProductOption[] {
        let options = [];
        for (const pog of group) {
            for (let opt of pog.options) {
                opt.title = pog.title;
                opt.type = pog.title;
                options.push(opt)
            }
        }
        return options;
    }

    static flatToGroup(options: ProductOption[]) {
        return [...new Set(options.map(item => item.type))].map((title: string) => {
            return {
                newOptionForm: ProductOptionHelper.getEmpty(),
                options: options.filter((o) => o.type === title),
                title: title
            }
        });
    }

  static toUniqueIdentifierOption(options: ProductOption[]):string {
    return options
      .sort((a,b)=> a.title.localeCompare(b.title))
      .map(a=> a.description).join('_');
  }
}
