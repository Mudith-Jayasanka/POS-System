import { Component, OnInit } from '@angular/core';

export interface Offerdetails {
  productCode : string;
  productName : string;
  price:string;
  additionalInfo:string;
  
}

@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  OfferName:string;
  OfferCode:string;
  OfferUnitPrice:string;
  AdditionalInfo:string;

  ProductCode : string; 
  ProductName :string;
  ProductPrice :string;
  ProductAdditionalInfo:string;
  

  constructor() { }

  listOfData: Offerdetails[] = [];

  ngOnInit(): void {
  }

  addRow(): void {
    //if(!this.packDataSet()) return
    //if(this.currentPackAdded()) return
    
    this.listOfData = [
      ...this.listOfData,
      {
        productCode : this. ProductCode.toString(),
        productName : this.ProductName.toString(),
        price: this.ProductPrice.toString(),
        additionalInfo: this.ProductAdditionalInfo.toString()
      }
    ];
    this.updateOfferListCode()
  }

  updateOfferListCode(){

  }

  addOffer(){

  }
}
