import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoHomePartComponent } from './info-home-part.component';

describe('InfoHomePartComponent', () => {
  let component: InfoHomePartComponent;
  let fixture: ComponentFixture<InfoHomePartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoHomePartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoHomePartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
