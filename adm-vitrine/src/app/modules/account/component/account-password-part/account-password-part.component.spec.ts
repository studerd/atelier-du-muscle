import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountPasswordPartComponent } from './account-password-part.component';

describe('AccountPasswordPartComponent', () => {
  let component: AccountPasswordPartComponent;
  let fixture: ComponentFixture<AccountPasswordPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountPasswordPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountPasswordPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
