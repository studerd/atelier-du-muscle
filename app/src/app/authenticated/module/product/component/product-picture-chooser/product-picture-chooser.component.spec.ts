import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPictureChooserComponent } from './product-picture-chooser.component';

describe('ProductPictureChooserComponent', () => {
  let component: ProductPictureChooserComponent;
  let fixture: ComponentFixture<ProductPictureChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPictureChooserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPictureChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
