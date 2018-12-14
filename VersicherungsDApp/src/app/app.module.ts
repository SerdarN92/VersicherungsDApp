import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NgbDateParserFormatter, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {HeaderComponent} from './header/header.component';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './home/home.component';
import {CreateTemplateComponent} from './templates/create-template/create-template.component';
import {ManageTemplatesComponent} from './templates/manage-templates/manage-templates.component';
import {CreateInsurancesModule} from './insurances/create-insurance/create-insurances.module';
import {NgbDateCustomParserFormatter} from './shared/ngbDateCustomParserFormatter';
import {HttpClientModule} from '@angular/common/http';
import {Web3Service} from './providers/web3.service';
import {ApiService} from './providers/api.service';
import {BackendService} from './providers/backend.service';
import { MyInsurancesComponent } from './insurances/my-insurances/my-insurances.component';
import {Ng4LoadingSpinnerModule} from 'ng4-loading-spinner';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    HomeComponent,
    CreateTemplateComponent,
    ManageTemplatesComponent,
    MyInsurancesComponent
  ],
  imports: [
    CreateInsurancesModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    Web3Service,
    ApiService,
    BackendService,
    // {provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
