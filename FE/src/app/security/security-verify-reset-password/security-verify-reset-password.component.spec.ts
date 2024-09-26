import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityVerifyResetPasswordComponent } from './security-verify-reset-password.component';

describe('SecurityVerifyResetPasswordComponent', () => {
  let component: SecurityVerifyResetPasswordComponent;
  let fixture: ComponentFixture<SecurityVerifyResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityVerifyResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityVerifyResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
