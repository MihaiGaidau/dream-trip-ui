import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByGuidComponent } from './search-by-guid.component';

describe('SearchByGuidComponent', () => {
  let component: SearchByGuidComponent;
  let fixture: ComponentFixture<SearchByGuidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchByGuidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchByGuidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
