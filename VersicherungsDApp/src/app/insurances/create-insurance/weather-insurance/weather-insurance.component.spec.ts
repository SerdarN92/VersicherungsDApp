import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherInsuranceComponent } from './weather-insurance.component';

describe('WeatherInsuranceComponent', () => {
  let component: WeatherInsuranceComponent;
  let fixture: ComponentFixture<WeatherInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
