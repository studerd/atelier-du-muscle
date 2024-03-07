import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountParameterPartComponent } from './account-parameter-part.component';

describe('AccountParameterPartComponent', () => {
  let component: AccountParameterPartComponent;
  let fixture: ComponentFixture<AccountParameterPartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountParameterPartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountParameterPartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
