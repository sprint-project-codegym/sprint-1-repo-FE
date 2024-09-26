import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundCreateComponent } from './ground-create.component';

describe('GroundCreateComponent', () => {
  let component: GroundCreateComponent;
  let fixture: ComponentFixture<GroundCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
