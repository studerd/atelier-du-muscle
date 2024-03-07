import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataViewerRouterComponent } from './data-viewer-router.component';

describe('DataViewerRouterComponent', () => {
  let component: DataViewerRouterComponent;
  let fixture: ComponentFixture<DataViewerRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataViewerRouterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataViewerRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
