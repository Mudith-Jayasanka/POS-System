import { Component, OnInit } from '@angular/core';

export interface paxdetails {
  paxno : String;
  paxprice : String;
  
}

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.css']
})
export class AddProductPageComponent implements OnInit {

  ProductName:string;
  MenuCode:string;
  Meattype:string;
  MeatCode:string;
  AdditionalInfo:string;
  Pax : string[]; //string array to put pax amounts 
  PaxPrice : string[] //string array to put pax price amounts 
  GeneratedCode:string;

  constructor() { }

  listOfData: paxdetails[] = [];

  addRow(): void {
    console.log(this.Pax)
    console.log(this.PaxPrice)
    this.listOfData = [
      ...this.listOfData,
      {
        paxno: this.Pax.toString() ,
        paxprice: this.PaxPrice.toString()
      }
    ];
    
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.paxno!== id);
  }

  ngOnInit(): void {
  
  }

  type(){
    console.log(this.Meattype);
  }

  addProduct(){
    this.validate()
  }

  validate(){
    
  }

  
}
