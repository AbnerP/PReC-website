import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsPageComponent } from './about-us-page/about-us-page.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CalculatorComponent } from './calculator/Calculator.component';
import { AddDriverComponent } from './drivers/add-driver/add-driver.component';
import { DriversComponent } from './drivers/Drivers.component';
import { AddEventComponent } from './events/add-event/add-event.component';
import { EventPageComponent } from './events/event-page/event-page.component';
import { EventsComponent } from './events/events.component';
import { AddGalleryImage } from './gallery-page/add-image/add-image.component';
import { GalleryPageComponent } from './gallery-page/gallery-page.component';
import { HomeComponent } from './home/home.component';
import { IsAdminGuard } from './is-admin.guard';
import { IsUserGuard } from './is-user.guard';
import { LoginComponent } from './security/login/login.component';
import { SignupComponent } from './security/signup/signup.component';
import { UsersComponent } from './users/users.component';


const routes: Routes = [
  {path:'home',component:HomeComponent},

  {path:'drivers',component:DriversComponent},
  {path:'drivers/new',component:AddDriverComponent, canActivate:[IsAdminGuard]},
  {path:'drivers/update/:id',component:AddDriverComponent, canActivate:[IsAdminGuard]},

  {path:'events',component:EventsComponent},
  {path:'events/new',component:AddEventComponent, canActivate:[IsAdminGuard]},
  {path:'events/id/:id',component:EventPageComponent},
  {path:'events/update/:id',component:AddEventComponent, canActivate:[IsAdminGuard]},

  {path:'gallery',component:GalleryPageComponent},
  {path:'gallery/new',component:AddGalleryImage},

  {path:'users',component:UsersComponent, canActivate:[IsAdminGuard]},
  {path:'settings',component:AccountSettingsComponent,canActivate:[IsUserGuard]},

  {path:'calculator',component:CalculatorComponent},

  {path:'about-us',component:AboutUsPageComponent},

  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},

  {path:'**',redirectTo:'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
