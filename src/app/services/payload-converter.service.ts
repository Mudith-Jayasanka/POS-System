import { Injectable } from '@angular/core';
import { CustomerDetails } from '../Interfaces/customer-details';
import { Offer } from '../Interfaces/offer';
import { OfferProductDetails } from '../Interfaces/offer-product-details';
import { Order } from '../Interfaces/order';
import { OrderDetails } from '../Interfaces/order-details';
import { OtherOrderInfo } from '../Interfaces/other-order-info';
import { Product } from '../Interfaces/product';
import { ProductOrder } from '../Interfaces/product-order';

@Injectable({
  providedIn: 'root'
})
export class PayloadConverterService {

  constructor() { }


  toOffer(payload) : Offer{
    let prodList : OfferProductDetails[] = []
    payload["offerProducts"].forEach((product)=>{
      prodList.push(this.toOfferProductDetails(product))
    });
    
    let offer : Offer = {
      "OfferName" : payload["OfferName"],
      "OfferCode" : payload["OfferCode"],
      "OfferUnitPrice" : payload["OfferUnitPrice"],
      "AdditionalInfo" : payload["AdditionalInfo"],
      "offerProducts" : prodList
    }
    return offer
  }

  toOfferProductDetails(payload) : OfferProductDetails{
    let prodDetails : OfferProductDetails = {
      "productName" : payload["productName"] ,
      "productCode": payload["productCode"],
      "additionalInfo" : payload["additionalInfo"],
      "price" : payload["price"]
    }
    return prodDetails
  }

  toProuct(payload) : Product{
    let product : Product = {
      "additionalInfo":payload["additionalInfo"],
      "generatedCode":payload["generatedCode"],
      "meatCode":payload["meatCode"],
      "menuCode":payload["menuCode"],
      "pax":payload["pax"],
      "price":payload["price"],
      "prodName":payload["prodName"]
    }
    return product
  }

  toCustomerDetaills(payload) : CustomerDetails{
    let customer : CustomerDetails = {
      "customerName" : payload["customerName"],
      "address": payload["address"],
      "phone": payload["phone"],
      "email": payload["email"]
    }
    return customer
  }

  toOrder(payload) : Order{
    let customerDetails : CustomerDetails;
    customerDetails = {
      "address" : payload["customerDetails"]["address"],
      "customerName" :  payload["customerDetails"]["customerName"],
      "email" :  payload["customerDetails"]["email"],
      "phone" :  payload["customerDetails"]["phone"]
    }

    let orderDetails : OrderDetails;
    orderDetails = {
      "invoiceNo" :  payload["orderDetails"]["invoiceNo"],
      "orderDate" :  payload["orderDetails"]["orderDate"],
      "supplyDate" :  payload["orderDetails"]["supplyDate"],
      "orderNo" :  payload["orderDetails"]["orderNo"],
      "supplyRefNo" :  payload["orderDetails"]["supplyRefNo"],
      "supplyTime" :  payload["orderDetails"]["supplyTime"]
    }

    let otherInfo : OtherOrderInfo;
    otherInfo = {
      "discount" :  payload["otherInfo"]["discount"],
      "approvedBy" :  payload["otherInfo"]["approvedBy"],
      "preparedBy" :  payload["otherInfo"]["preparedBy"],
      "subTotal" :  payload["otherInfo"]["subTotal"],
      "total" :  payload["otherInfo"]["total"]
    }

    let productOrderList : ProductOrder[] = []
    payload["productOrders"].forEach((product)=>{
      let prodOrder : ProductOrder = {
        "Menu":product["Menu"],
        "Price":Number.parseInt(product["Price"]),
        "ProductCode":product["ProductCode"],
        "Qty":Number.parseInt(product["Qty"]),
        "Rate":Number.parseInt(product["Rate"])
      }
      productOrderList.push(prodOrder)
    })


    let order : Order;
    order = {
      "customerDetails" : customerDetails,
      "orderDetails" : orderDetails,
      "productOrders" :  productOrderList,
      "otherInfo" : otherInfo
    }
    return order
  }
}
