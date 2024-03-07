import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPictureItemComponent } from './product-picture-item.component';

describe('ProductPictureItemComponent', () => {
  let component: ProductPictureItemComponent;
  let fixture: ComponentFixture<ProductPictureItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPictureItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPictureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
