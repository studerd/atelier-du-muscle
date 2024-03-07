import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewerHomeComponent } from './data-viewer-home.component';

describe('DataViewerHomeComponent', () => {
  let component: DataViewerHomeComponent;
  let fixture: ComponentFixture<DataViewerHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataViewerHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataViewerHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
