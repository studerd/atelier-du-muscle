import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-who-we-are',
  templateUrl: './who-we-are.component.html',
  styleUrls: ['./who-we-are.component.scss']
})
export class WhoWeAreComponent implements OnInit{
  borderTriangle = '1080px solid transparent';
  ngOnInit():void {
    this.setTriangle();
  }
  setTriangle():void{
    this.borderTriangle = window.innerWidth +'px solid transparent';
  }
}
