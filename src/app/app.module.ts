import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import hi from '@angular/common/locales/hi';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { NzTableModule } from 'ng-zorro-antd/Table';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CustomerTableComponent } from './tables/customer-table/customer-table.component';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { AddOrderPageComponent } from './pages/add-order-page/add-order-page.component';
import { AddOrderTableComponent } from './tables/add-order-table/add-order-table.component';
import { AddCustomersComponent } from './pages/add-customers/add-customers.component';

import { AngularFireModule } from '@angular/fire'
import { AngularFireDatabaseModule } from "@angular/fire/database"
import { environment } from "../environments/environment";
import { OrderHistoryPageComponent } from './pages/order-history-page/order-history-page.component';
import { AddProductPageComponent } from './pages/add-product-page/add-product-page.component';
import { SalesSummeryComponent } from './pages/sales-summery/sales-summery.component';


registerLocaleData(hi);

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    CustomerTableComponent,
    AddOrderPageComponent,
    AddOrderTableComponent,
    AddCustomersComponent,
    OrderHistoryPageComponent,
    AddProductPageComponent,
    SalesSummeryComponent
  ],
  imports: [
    BrowserModule,
    NzTableModule,
    NzLayoutModule,
    NzMenuModule,
    DemoNgZorroAntdModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
