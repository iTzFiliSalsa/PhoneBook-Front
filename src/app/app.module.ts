import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './system/home/home.component';
import { ContentComponent } from './system/content/content.component';
import { ConfigurationComponent } from './system/configuration/configuration.component';
import { DescriptionComponent } from './system/description/description.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { NewComponent } from './system/new/new.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ContentComponent,
    ConfigurationComponent,
    DescriptionComponent,
    NewComponent
  ],
  imports: [
    SweetAlert2Module.forRoot(),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
