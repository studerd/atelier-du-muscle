import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BucketBagComponent } from './bucket-bag.component';

describe('BucketBagComponent', () => {
  let component: BucketBagComponent;
  let fixture: ComponentFixture<BucketBagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BucketBagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BucketBagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
