import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountOrderPartComponent } from './account-order-part.component';

describe('AccountOrderPartComponent', () => {
  let component: AccountOrderPartComponent;
  let fixture: ComponentFixture<AccountOrderPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountOrderPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountOrderPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
