import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderLandingPageComponent } from './order-landing-page.component';

describe('OrderLandingPageComponent', () => {
  let component: OrderLandingPageComponent;
  let fixture: ComponentFixture<OrderLandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderLandingPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderLandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
