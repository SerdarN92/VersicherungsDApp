import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightInsuranceComponent } from './flight-insurance.component';

describe('FlightInsuranceComponent', () => {
  let component: FlightInsuranceComponent;
  let fixture: ComponentFixture<FlightInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
