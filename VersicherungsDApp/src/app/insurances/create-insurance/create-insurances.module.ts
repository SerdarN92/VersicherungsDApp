import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CreateInsurancesRoutingModule} from './create-insurances-routing.module';
import {WeatherInsuranceComponent} from './weather-insurance/weather-insurance.component';
import {FlightInsuranceComponent} from './flight-insurance/flight-insurance.component';
import {LifeInsuranceComponent} from './life-insurance/life-insurance.component';
import {CreateInsuranceComponent} from './create-insurance.component';
import {DropdownWithSelectionComponent} from '../../shared/dropdown-with-selection/dropdown-with-selection.component';

@NgModule({
  imports: [
    CreateInsurancesRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    NgbModule
  ],
  declarations: [CreateInsuranceComponent, WeatherInsuranceComponent, FlightInsuranceComponent, LifeInsuranceComponent, DropdownWithSelectionComponent]
})
export class CreateInsurancesModule {
}
