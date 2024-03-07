import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleTopBarComponent } from './module-top-bar.component';

describe('ModuleTopBarComponent', () => {
  let component: ModuleTopBarComponent;
  let fixture: ComponentFixture<ModuleTopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModuleTopBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModuleTopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
