import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthenErrorPageComponent } from './authen-error-page.component';

describe('AuthenErrorPageComponent', () => {
  let component: AuthenErrorPageComponent;
  let fixture: ComponentFixture<AuthenErrorPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthenErrorPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthenErrorPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
