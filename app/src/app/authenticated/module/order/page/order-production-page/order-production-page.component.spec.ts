import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderProductionPageComponent } from './order-production-page.component';

describe('OrderProductionPageComponent', () => {
  let component: OrderProductionPageComponent;
  let fixture: ComponentFixture<OrderProductionPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderProductionPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderProductionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
