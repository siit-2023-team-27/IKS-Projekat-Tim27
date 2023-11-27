import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterAccommodationComponent } from './filter-accommodation.component';

describe('FilterAccommodationComponent', () => {
  let component: FilterAccommodationComponent;
  let fixture: ComponentFixture<FilterAccommodationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FilterAccommodationComponent]
    });
    fixture = TestBed.createComponent(FilterAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
