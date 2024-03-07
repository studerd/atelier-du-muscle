import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderRouterComponent } from './order-router.component';

describe('OrderRouterComponent', () => {
  let component: OrderRouterComponent;
  let fixture: ComponentFixture<OrderRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderRouterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
