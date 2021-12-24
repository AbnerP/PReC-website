import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MaterialModule } from './material/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DriversComponent } from './drivers/Drivers.component';
import { CalculatorComponent } from './calculator/Calculator.component';
import { AboutUsComponent } from './home/about-us/about-us.component';
import { JoinUsComponent } from './home/join-us/join-us.component';
import { CalendarPreviewComponent } from './home/calendar-preview/calendar-preview.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DriverCardComponent } from './drivers/driver-card/driver-card.component';
import { AddDriverComponent } from './drivers/add-driver/add-driver.component';
import { EventsComponent } from './events/events.component';
import { EventCardComponent } from './events/event-card/event-card.component';
import { EventPageComponent } from './events/event-page/event-page.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { AuthorizeViewComponent } from './security/authorize-view/authorize-view.component';
import { LoginComponent } from './security/login/login.component';
import { SignupComponent } from './security/signup/signup.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
      DriversComponent,
      CalculatorComponent,
      AboutUsComponent,
      JoinUsComponent,
      CalendarPreviewComponent,
      FooterComponent,
      DriverCardComponent,
      AddDriverComponent,
      EventsComponent,
      EventCardComponent,
      EventPageComponent,
      AddEventComponent,
      AboutUsPageComponent,
      AuthorizeViewComponent,
      LoginComponent,
      SignupComponent,
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
