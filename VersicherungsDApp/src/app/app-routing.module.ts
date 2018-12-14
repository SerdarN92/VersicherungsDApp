import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {CreateTemplateComponent} from './templates/create-template/create-template.component';
import {ManageTemplatesComponent} from './templates/manage-templates/manage-templates.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent,
    children: []
  },
  {
    path: 'create-template',
    component: CreateTemplateComponent,
    children: []
  },
  {
    path: 'manage-templates',
    component: ManageTemplatesComponent,
    children: []
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
