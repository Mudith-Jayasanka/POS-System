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

  addCustomer(){
    return this.angfire.collection("Customers")
  }

  //====================================================================================
  //Product Related Methods

  getProductCollection(){
    return this.angfire.collection("Products").doc("regular_products").collection("data")
  }
  getProductDoc(){
    return this.angfire.collection("Products").doc("regular_products")
  }

  getProductOfferCollection(){
    return this.angfire.collection("Products").doc("offer_products").collection("data")
  }
  getProductOfferDoc(){
    return this.angfire.collection("Products").doc("offer_products")
  }

  //Attempts to delete product Offer also in case it exists
  deleteProduct(docName){
    docName = docName.toUpperCase();
    return this.angfire.collection("Products").doc("regular_products").collection("data").doc(docName).delete()
    .then(()=>{
      this.angfire.collection("Products").doc("offer_products").collection("data").doc(docName).delete()
    })
  }


  
}
