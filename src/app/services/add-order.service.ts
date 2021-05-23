import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '../Interfaces/order';
import { Product } from '../Interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class AddOrderService {

  constructor(private angfire : AngularFirestore) { }


  addOrder(Order : Order){
    return this.angfire.collection("Orders").doc(Order.orderDetails.orderNo.toString()).set(Order);
  }

  addProduct(product : Product){
    return this.angfire.collection("Products").doc(product.code).set(product);
  }
}
