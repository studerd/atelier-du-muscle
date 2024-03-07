import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountIdentityPartComponent } from './account-identity-part.component';

describe('AccountIdentityPartComponent', () => {
  let component: AccountIdentityPartComponent;
  let fixture: ComponentFixture<AccountIdentityPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountIdentityPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountIdentityPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
