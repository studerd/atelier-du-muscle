import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BigBangComponent } from './big-bang.component';

describe('BigBangComponent', () => {
  let component: BigBangComponent;
  let fixture: ComponentFixture<BigBangComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BigBangComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BigBangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
