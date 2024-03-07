import {Component, OnInit} from '@angular/core';
import {ProductService} from '@product/service/product.service';

@Component({
  selector: 'app-shop-page',
  templateUrl: './shop-page.component.html',
  styleUrls: ['./shop-page.component.scss']
})
export class ShopPageComponent implements OnInit {
  constructor(public productService: ProductService) {
  }

  ngOnInit(): void {
    this.productService.list();
  }
}
