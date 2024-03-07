import {Component, Input, OnInit} from '@angular/core';
import {Product, ProductOption, ProductOptionGroup} from '@product/model';
import {productHelper} from '@product/helper';
import {isNil} from 'lodash';
import {ProductOptionHelper} from '@product/helper/product-option.helper';
import {OrderService} from '@order/service/order.service';
import {OrderHelper} from '@order/helper';
import {Order, OrderLine} from '@order/model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-shop',
  templateUrl: './product-shop.component.html',
  styleUrls: ['./product-shop.component.scss']
})
export class ProductShopComponent implements OnInit {
  @Input() product: Product = productHelper.getEmpty();
  totalPrice = '0';
  count = 1;
  bulletPoints: string[] = [];
  options: ProductOptionGroup[] = [];
  bucket: Order = OrderHelper.getEmpty();
  currentPicture: string = '';
  canAdd = true;

  constructor(public router: Router, public orderService: OrderService) {
  }

  ngOnInit(): void {
    this.orderService.bucket$.subscribe((bucket: Order) => {
      this.bucket = bucket;
    });
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

  goDetail(): void {
    this.router.navigate(['/product/detail/' + this.product.id]).then();

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
