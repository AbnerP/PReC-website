import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/Calculator.component';
import { AddDriverComponent } from './drivers/add-driver/add-driver.component';
import { DriversComponent } from './drivers/Drivers.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { EventPageComponent } from './events/event-page/event-page.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { SignupComponent } from './security/signup/signup.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},

  {path:'drivers',component:DriversComponent},
  {path:'drivers/new',component:AddDriverComponent},

  {path:'events',component:EventsComponent},
  {path:'events/new',component:AddEventComponent},
  {path:'events/id/:id',component:EventPageComponent},


  {path:'calculator',component:CalculatorComponent},

  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},

  // {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
