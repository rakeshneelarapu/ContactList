import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactListComponent } from './contact-list/contact-list.component';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { ContactCenterComponent } from './contact-center/contact-center.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { ContactService } from './services/contact/contact.service';
import { RegistrationService } from './services/registration/registration.service';
import { AlertService } from './services/alert/alert.service';
import { AlertComponent } from './alert/alert.component';
import { LoginService } from './services/login/login.service';
import { PasswordComponent } from './password/password.component';

@NgModule({
  declarations: [
    AppComponent,
    ContactListComponent,
    HomeComponent,
    RegistrationComponent,
    ContactCenterComponent,
    ContactDetailComponent,
    AlertComponent,
    PasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [ContactService, RegistrationService, AlertService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
