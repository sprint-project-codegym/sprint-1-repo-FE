import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecurityVerificationComponent } from './security-verification.component';

describe('SecurityVerificationComponent', () => {
  let component: SecurityVerificationComponent;
  let fixture: ComponentFixture<SecurityVerificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecurityVerificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecurityVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
