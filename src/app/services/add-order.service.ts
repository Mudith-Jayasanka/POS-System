import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from '../Interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class AddOrderService {

  constructor(private angfire : AngularFirestore) { }


  addSomething(docName : any,data : any){
    return this.angfire.collection("RandomCollection").doc(docName).set(data);
  }

  addProduct(product : Product){
    return this.angfire.collection("Products").doc(product.code).set(product);
  }
}
