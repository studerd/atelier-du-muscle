import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductRouterComponent } from './product-router.component';

describe('ProductRouterComponent', () => {
  let component: ProductRouterComponent;
  let fixture: ComponentFixture<ProductRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductRouterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
