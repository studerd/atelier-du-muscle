import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenticatedRouterComponent } from './authenticated-router.component';

describe('AuthenticatedRouterComponent', () => {
  let component: AuthenticatedRouterComponent;
  let fixture: ComponentFixture<AuthenticatedRouterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthenticatedRouterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthenticatedRouterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
