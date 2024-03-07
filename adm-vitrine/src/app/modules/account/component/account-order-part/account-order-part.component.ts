import {Component, Input, OnInit} from '@angular/core';
import {Profile} from '@account/model';
import {AuthService} from '@security/service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-order-part',
  templateUrl: './account-order-part.component.html',
  styleUrls: ['./account-order-part.component.scss']
})
export class AccountOrderPartComponent implements OnInit {
  @Input() profile!: Profile;

  constructor(public authService: AuthService, public router: Router) {
  }

  ngOnInit(): void {
  }

  showDetail(id: string): void {
    this.router.navigate(['order/detail/' + id]).then();
  }
}
