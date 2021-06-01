import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrderPageComponent } from './pages/add-order-page/add-order-page.component';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { OrderHistoryPageComponent } from './pages/order-history-page/order-history-page.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/register/register.component';
import { SalesSummeryComponent } from './pages/sales-summery/sales-summery.component';
import { AddOfferComponent } from './pages/add-offer/add-offer.component';



const routes: Routes = [
  { path: '',redirectTo:"/login" , pathMatch:"full"},
  { path: 'homepage', component:HomePageComponent},
  { path: 'Add-Order' , component:AddOrderPageComponent},
  { path: 'Add-Offers' , component:AddOfferComponent},
  { path: 'Order-History' , component:OrderHistoryPageComponent},
  { path: 'Add-Product' , component:AddProductPageComponent},
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'sales-Summery' , component: SalesSummeryComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
