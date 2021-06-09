import { Injectable } from '@angular/core';
import { Offer } from '../Interfaces/offer';
import { OfferProductDetails } from '../Interfaces/offer-product-details';
import { Product } from '../Interfaces/product';

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
}
