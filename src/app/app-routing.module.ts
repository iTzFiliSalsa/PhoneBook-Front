import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { ConfigurationComponent } from './system/configuration/configuration.component';
import { ContentComponent } from './system/content/content.component';
import { DescriptionComponent } from './system/description/description.component';
import { HomeComponent } from './system/home/home.component';
import { NewComponent } from './system/new/new.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      {
        path:'content',
        component: ContentComponent,
        children: [
          {
            path:'',
            redirectTo: 'new',
            pathMatch: 'full'
          },
          {
            path: 'new',
            component: NewComponent
          },
          {
            path: 'description/:id/:nombre/:cargo/:telefono',
            component: DescriptionComponent
          }
        ]
      },{
        path: 'configuration',
        component: ConfigurationComponent
      }
    ]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
