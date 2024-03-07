import {AfterViewInit, Component, Inject, OnInit} from '@angular/core';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-nav-header',
  templateUrl: './nav-header.component.html',
  styleUrls: ['./nav-header.component.scss']
})
export class NavHeaderComponent implements OnInit, AfterViewInit {
  hagenOffset = 0;
  whoiamOffset = 0;
  coachingOffset = 0;
  videoOffset = 0;
  contactOffset = 0;
  currentSection = 'hagen';
  fixed = false;

  constructor( @Inject(DOCUMENT) private document: any) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.hagenOffset = document.getElementById('hagen')?.offsetTop!;
    this.whoiamOffset = document.getElementById('who-we-are-anchor')?.offsetTop!;
    this.coachingOffset = document.getElementById('home-coaching')?.offsetTop!;
    this.contactOffset = document.getElementById('contact-anchor')?.offsetTop!;

  }

  goTo(cat: string): void {
    switch (cat) {
      case 'hagen':
        document.getElementById("#hagen")!.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
        this.currentSection = 'hagen';
        break;
      case 'whoiam':
        document.getElementById("who-we-are-anchor")!.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
        this.currentSection = 'whoiam';
        break;
      case 'coaching':
        document.getElementById("product-anchor")!.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
        this.currentSection = 'coaching';
        break;
      case 'video':
        document.getElementById("video")!.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
        this.currentSection = 'video';
        break;
      case 'contact':
        document.getElementById("#contact-anchor")!.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest"
        });
        this.currentSection = 'contact';
        break;
    }
  }

  onScroll(): void {
    const curr = window.scrollY;
    if (curr < this.whoiamOffset -80) {
      // hagen
      this.currentSection = 'hagen';
    } else if (curr < this.coachingOffset) {
      //whoiam
      this.currentSection = 'whoiam';
    } else if (curr < this.videoOffset) {
      //coaching
      this.currentSection = 'coaching';
    } else if (curr < this.contactOffset) {
      // video
      this.currentSection = 'video';
    }
    this.fixed = (this.currentSection !== 'hagen');
    console.log('currentSection', this.currentSection);
  }
}
