import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddOrderPageComponent } from './pages/add-order-page/add-order-page.component';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { OrderHistoryPageComponent } from './pages/order-history-page/order-history-page.component';
import { SalesSummeryComponent } from './pages/sales-summery/sales-summery.component';
import { AddOfferComponent } from './pages/add-offer/add-offer.component';
import { SignInComponent } from './pages/sign-in/sign-in.component'
import { AuthGuard } from "./shared/guard/auth.guard";
import { SecureInnerPagesGuard } from "./shared/guard/secure-inner-pages.guard";


const routes: Routes = [
  { path: '',redirectTo:"/sign-in" , pathMatch:"full"},
  //{ path: 'homepage', component:HomePageComponent , canActivate: [AuthGuard] },
  { path: 'homepage', component:HomePageComponent},
  { path: 'Add-Order' , component:AddOrderPageComponent , canActivate: [AuthGuard]},
  { path: 'Add-Offers' , component:AddOfferComponent ,  canActivate: [AuthGuard]},
  { path: 'Order-History' , component:OrderHistoryPageComponent ,  canActivate: [AuthGuard]},
  { path: 'Add-Product' , component:AddProductPageComponent ,  canActivate: [AuthGuard]},
  { path: 'sales-Summery' , component: SalesSummeryComponent ,  canActivate: [AuthGuard]},
  { path: 'sign-in' , component: SignInComponent ,  canActivate: [SecureInnerPagesGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
