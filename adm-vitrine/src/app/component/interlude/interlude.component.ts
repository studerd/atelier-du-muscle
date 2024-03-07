import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-interlude',
  templateUrl: './interlude.component.html',
  styleUrls: ['./interlude.component.scss']
})
export class InterludeComponent implements OnInit {
  borderTriangle = '1080px solid transparent';
  borderTriangle2 = '1080px';
  constructor(public router:Router) {
  }
  ngOnInit(): void {
    this.setTriangle();
  }

  setTriangle(): void {
    this.borderTriangle = window.innerWidth + 'px solid transparent';
    this.borderTriangle2 = ''+window.innerWidth +'px';
  }

  goTo() {
    this.router.navigate(['/shop']).then();
  }
}
