import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  type(){
    console.log(this.Meattype);
  }

}
