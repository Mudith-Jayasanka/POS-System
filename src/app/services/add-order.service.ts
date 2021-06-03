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
    return this.angfire.collection("Products")
  }

  addCustomer(){
    return this.angfire.collection("Customers")
  }

  addSinglePack(){
    return this.angfire.collection("Products")
  }
}
