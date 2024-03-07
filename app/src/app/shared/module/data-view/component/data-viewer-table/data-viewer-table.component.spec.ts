import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewerTableComponent } from './data-viewer-table.component';

describe('DataViewerTableComponent', () => {
  let component: DataViewerTableComponent;
  let fixture: ComponentFixture<DataViewerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataViewerTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataViewerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
