import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalculatorComponent } from './calculator/Calculator.component';
import { DriversComponent } from './drivers/Drivers.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './security/login/login.component';
import { SignupComponent } from './security/signup/signup.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},

  {path:'drivers',component:DriversComponent},

  {path:'calculator',component:CalculatorComponent},

  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},

  {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
