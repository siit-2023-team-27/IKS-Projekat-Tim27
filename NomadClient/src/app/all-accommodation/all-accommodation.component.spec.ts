import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAccommodationComponent } from './all-accommodation.component';

describe('AllAccommodationComponent', () => {
  let component: AllAccommodationComponent;
  let fixture: ComponentFixture<AllAccommodationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllAccommodationComponent]
    });
    fixture = TestBed.createComponent(AllAccommodationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
