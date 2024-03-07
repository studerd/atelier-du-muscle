import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewerLoaderComponent } from './data-viewer-loader.component';

describe('DataViewerLoaderComponent', () => {
  let component: DataViewerLoaderComponent;
  let fixture: ComponentFixture<DataViewerLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataViewerLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataViewerLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
