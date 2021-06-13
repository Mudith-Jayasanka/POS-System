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
  
  //====================================================================================
  //Order Related Methods

  getOrderCollection(){
    return this.angfire.collection("Orders");
  }

  getOrderDateDoc(){
    return this.angfire.collection("Orders").doc("Date_Sorted")
  }

  // getOrderCustSort(){
  //   return this.angfire.collection("Orders").doc("Customer_Sorted")
  // }

  addOrder(Order : Order){
    return this.getOrderCollection().doc("Customer_Sorted").collection(Order.customerDetails.phone.toString())
    .doc(Order.orderDetails.orderNo.toString()).set(Order)
    .then(()=>{
      this.getOrderCollection().doc("Date_Sorted").collection(Order.orderDetails.orderDate.toString().replace(/\//g, "_"))
    .doc(Order.orderDetails.orderNo.toString()).set(Order)
    })
  }

  

  //====================================================================================
  //Customer Related Methods

  getCustomerCollection(){
    return this.angfire.collection("Customers")
  }

  getCustomerDoc(){
    return this.angfire
  }

  addCustomer(Customer : CustomerDetails){
    return this.getCustomerCollection().doc(Customer.phone.toString()).get().subscribe((data)=>{
      if(!data.exists){
        //Create New Customer
        this.getCustomerCollection().doc(Customer.phone.toString()).set(Customer)
      }
    })
  }

  deleteCustomer(phone : string){
    return this.angfire.collection("Customers").doc(phone).delete()
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
