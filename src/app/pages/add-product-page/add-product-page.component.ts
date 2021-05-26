import { Component, OnInit } from '@angular/core';

export interface paxdetails {
  paxno : String;
  paxprice : String;
  generatedCode:String;
  
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
  Pax : string; //string array to put pax amounts 
  PaxPrice : string; //string array to put pax price amounts 
  GeneratedCode:string;

  constructor() { }

  listOfData: paxdetails[] = [];
  

  addRow(): void {
    //if(!this.packDataSet()) return
    if(this.currentPackAdded()) return
    
    this.listOfData = [
      ...this.listOfData,
      {
        paxno: this.Pax.toString() ,
        paxprice: this.PaxPrice.toString(),
        generatedCode:this.GeneratedCode.toString()
      }
    ];
    this.updateOrderListCode()
  }

  updateOrderListCode(){
    if(this.listOfData.length< 1) return

    let tempList : paxdetails[] = [];
    this.listOfData.forEach((rowData)=>{
      tempList.push({
        paxno : rowData.paxno,
        paxprice : rowData.paxprice,
        generatedCode : this.getRecordCode(rowData)
      });
    });
    this.listOfData = tempList

  }

  getRecordCode(rowData : paxdetails){
    if(!this.valid_menu_code()) return "Set Menu Code"
    if(this.Meattype === undefined) return "Set MeatType"
    let code : string;
    code = this.MenuCode + "-" + this.Meattype + rowData.paxno
    return code
  }

  packDataSet(){
    if(this.Pax === undefined) return false
    if(this.Pax == "") return false
    if(this.PaxPrice === undefined) return false
    if(this.PaxPrice == "") return false
    return true
  }

  currentPackAdded(){
    let isAdded : boolean = false;
    this.listOfData.forEach((data) =>{
      if(data.paxno == this.Pax){
        isAdded = true
        return 
      }
    });
    return isAdded
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.paxno!== id);
  }

  ngOnInit(): void {
    this.GeneratedCode='gcode';
  }

  type(){
    console.log(this.Meattype);
  }

  addProduct(){
    if(this.validated()){
      console.log("All Valid")
    }else{
      console.log("Validation Failed")
    }
  }

  validated(){
    //Returns True if validations are successfull
    if(!this.valid_prod_name()) return false
    if(this.Meattype === undefined) return false
    if(!this.valid_menu_code()) return false
    if((this.listOfData.length < 1) || (this.listOfData === undefined) ) return false
    
    return true
  }

  valid_prod_name(){
    if(this.ProductName == "") return false
    if(this.ProductName === undefined) return false
    return true
  }

  valid_menu_code(){
    if(this.MenuCode === undefined) return false
    if(this.MenuCode == "") return false
    return true
  }

  
}
