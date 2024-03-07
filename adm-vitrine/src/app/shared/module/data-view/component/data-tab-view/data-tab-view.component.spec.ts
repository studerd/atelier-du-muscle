import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTabViewComponent } from './data-tab-view.component';

describe('DataTabViewComponent', () => {
  let component: DataTabViewComponent;
  let fixture: ComponentFixture<DataTabViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataTabViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataTabViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
