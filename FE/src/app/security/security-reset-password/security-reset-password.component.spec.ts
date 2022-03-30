import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityResetPasswordComponent } from './security-reset-password.component';

describe('SecurityResetPasswordComponent', () => {
  let component: SecurityResetPasswordComponent;
  let fixture: ComponentFixture<SecurityResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
