import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AppPageEnum} from '@shared/model';
import {OrderService} from '@order/service/order.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent {
  current: string = '';
  mobile = false;
  menuOpen = false;

  constructor(public router: Router, public orderService:OrderService) {
  }

  menu: { name: string, link: AppPageEnum }[] = [];

  ngOnInit(): void {
    this.current = window.location.pathname.replace('/', '');
    this.menu = [
      {name: 'work', link: AppPageEnum.WORK},
      {name: 'shop', link: AppPageEnum.SHOP},
      {name: 'contact', link: AppPageEnum.CONTACT}
    ]
  }

  goTo(path: string): void {
    this.menuOpen = false;
    this.router.navigate([path]).then();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }
}
