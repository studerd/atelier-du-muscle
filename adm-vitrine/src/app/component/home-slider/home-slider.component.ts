import {Component, OnInit} from '@angular/core';
import {interval} from 'rxjs';

@Component({
  selector: 'app-home-slider',
  templateUrl: './home-slider.component.html',
  styleUrls: ['./home-slider.component.scss']
})
export class HomeSliderComponent implements OnInit {
  height = 0;
  top = '0px';
  threeTop = '0px';
  sliderTop = '0px';
  currentPicture = 1;
  activeIcon = 1;
  indexStr = 'first';
  isMobile = false;

  constructor() {
  }

  ngOnInit(): void {
    this.setHeight();
    this.slider();
  }

  setHeight(): void {
    const wH = window.outerHeight;
    this.isMobile = (window.innerWidth < 1000);
    if (this.isMobile) {
      this.height = wH - 40;
      this.top = (this.height) + 'px';
      this.threeTop = (3 * this.height) + 'px';
    } else {
      this.height = wH - 60;
      this.top = (this.height + 200) + 'px';
      this.threeTop = (3 * (this.height + 200)) + 'px';
    }
  }

  slider(): void {
    interval(8000).subscribe(() => {
      if (this.currentPicture === 3) {
        this.currentPicture = 1;
        this.indexStr = 'first';
      } else {
        this.currentPicture++;
        if (this.currentPicture === 2) {
          this.indexStr = 'second';
        } else {
          this.indexStr = 'third';
        }
      }
      if (this.isMobile) {
        this.sliderTop = '-' + ((this.currentPicture - 1) * this.height) + 'px';
      } else {
        this.sliderTop = '-' + ((this.currentPicture - 1) * (this.height + 200)) + 'px';
      }
      this.setActiveIcon();
    });
  }

  setActiveIcon(): void {

    let number = this.activeIcon;
    while (number === this.activeIcon) {
      number = Math.floor(Math.random() * (12 + 1))
    }
    this.activeIcon = number;
  }
}
