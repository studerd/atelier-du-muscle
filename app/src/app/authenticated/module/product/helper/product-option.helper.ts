import {
    ProductionOption,
    ProductOption,
    ProductOptionDto,
    ProductOptionGroup,
    ProductProductionGroup
} from '@product/model';
import {Order, OrderLine} from '@order/model';
import {isNil} from 'lodash';

export class ProductOptionHelper {
    public static orderLineToProductOptionProduction(orderLine: OrderLine): ProductionOption[] {
        const distinct = [...new Set(orderLine.product.options.map((o: ProductOption) => o.title))];
        return distinct.map((option: string) => {
            const selection = orderLine.options.filter((o) => o.title === option);
            return {
                str: option,
                selected: (selection.length > 0) ? selection[0].description : '-'
            }
        })
    }

    public static getUniqueProductOption(orders: Order[]): ProductProductionGroup[] {
        let array: string[] = orders.map(order => order.lines).flat().map(orderLine =>
            orderLine.options.length > 0 ?
                orderLine.options.map(o => orderLine.product.title + ' ' + o.title + ' ' + o.description).flat() :
                [orderLine.product.title]).flat();
        const data: ProductProductionGroup[] = [];
        for (const name of array) {
            const exist = data.find(d => d.product === name);
            if (!isNil(exist)) {
                exist.qty++;
            } else {
                data.push({product: name, qty: 1});
            }
        }
        return data;
    }

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
}