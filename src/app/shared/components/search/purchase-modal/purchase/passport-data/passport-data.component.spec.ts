import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportDataComponent } from './passport-data.component';

describe('PassportDataComponent', () => {
  let component: PassportDataComponent;
  let fixture: ComponentFixture<PassportDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassportDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
