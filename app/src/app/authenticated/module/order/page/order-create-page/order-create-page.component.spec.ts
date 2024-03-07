import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCreatePageComponent } from './order-create-page.component';

describe('OrderCreatePageComponent', () => {
  let component: OrderCreatePageComponent;
  let fixture: ComponentFixture<OrderCreatePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderCreatePageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OrderCreatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
