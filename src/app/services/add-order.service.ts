import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { CustomerDetails } from '../Interfaces/customer-details';
import { Order } from '../Interfaces/order';
import { Product } from '../Interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class AddOrderService {

  constructor(private angfire : AngularFirestore) { }


  getOrderCollection(){
    return this.angfire.collection("Orders");
  }

  getOrderDateDoc(){
    return this.angfire.collection("Orders").doc("Date_Sorted")
  }

  getProduct(){
    return this.angfire.collection("Products").doc("regular_products").collection("data")
  }

  getProductOffer(){
    return this.angfire.collection("Products").doc("offer_products").collection("data")
  }
  getProductOfferCollection(){
    return this.angfire.collection("Products").doc("offer_products")
  }

  addCustomer(){
    return this.angfire.collection("Customers")
  }
}
