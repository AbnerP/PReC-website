import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './general-components/nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DriversComponent } from './drivers/Drivers.component';
import { CalculatorComponent } from './calculator/Calculator.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { JoinUsComponent } from './home/join-us/join-us.component';
import { CalendarPreviewComponent } from './home/calendar-preview/calendar-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
      DriversComponent,
      CalculatorComponent,
      LoginComponent,
      SignupComponent,
      AboutUsComponent,
      JoinUsComponent,
      CalendarPreviewComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
