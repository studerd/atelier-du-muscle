import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHomePageComponent } from './order-home-page.component';

describe('OrderHomePageComponent', () => {
  let component: OrderHomePageComponent;
  let fixture: ComponentFixture<OrderHomePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderHomePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
