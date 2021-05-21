import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddCustomersComponent } from './pages/add-customers/add-customers.component';
import { AddOrderPageComponent } from './pages/add-order-page/add-order-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';

const routes: Routes = [
  { path: '',redirectTo:"/homepage" , pathMatch:"full"},
  { path: 'homepage', component:HomePageComponent},
  { path: 'Add-Order' , component:AddOrderPageComponent},
  { path: 'Add-customers' , component:AddCustomersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
