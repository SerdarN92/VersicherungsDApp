import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {CreateInsuranceComponent} from './create-insurance.component';
import {WeatherInsuranceComponent} from './weather-insurance/weather-insurance.component';
import {FlightInsuranceComponent} from './flight-insurance/flight-insurance.component';
import {LifeInsuranceComponent} from './life-insurance/life-insurance.component';
import {MyInsurancesComponent} from '../my-insurances/my-insurances.component';

const routes: Routes = [
  {
    path: 'create-insurance',
    component: CreateInsuranceComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'weather'
      },
      {
        path: 'weather',
        component: WeatherInsuranceComponent
      },
      {
        path: 'flight',
        component: FlightInsuranceComponent
      },
      {
        path: 'life',
        component: LifeInsuranceComponent
      }
    ]
  },
  {
    path: 'my-insurances',
    component: MyInsurancesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CreateInsurancesRoutingModule {
}
