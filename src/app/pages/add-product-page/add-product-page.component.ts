import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Product } from 'src/app/Interfaces/product';
import { AddOrderService } from 'src/app/services/add-order.service';

export interface paxdetails {
  paxno : string;
  paxprice : string;
  generatedCode:string;
  
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

  constructor(private addProdService : AddOrderService ,private modalService: NzModalService) { }

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
    this.updateOrderListCode();
    this.Pax = "";
    this.PaxPrice = "";
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

  getProductObjs(){
    let productList : Product[] = [];
    this.listOfData.forEach((row)=>{
      let product : Product = {
        prodName : this.ProductName,
        additionalInfo : this.AdditionalInfo,
        pax : Number.parseInt(row.paxno),
        price : Number.parseInt(row.paxprice),
        menuCode : this.MenuCode,
        meatCode : this.Meattype,
        generatedCode : row.generatedCode
      }
      productList.push(product);
    });
    return productList
  }

  uploadProducts(prodList : Product[]){
    if(prodList.length == 0) return

    this.addProdService.getProduct().doc(prodList[0].generatedCode).set(prodList[0]).then((res)=>{
      console.log("Uploaded  : " + prodList[0].generatedCode)
      prodList.shift()
      this.uploadProducts(prodList)
    });
  }


  addProduct(){
    if(this.validated()){
      console.log("All Valid")
      this.uploadProducts(this.getProductObjs());
    }else{
      console.log("Validation Failed")
    }
  }


  //notification modal
  //just call this method to invoke the modal
  notificationcontent:string;
  modal : any
  success(): void {
    this.modal = this.modalService.success({
      nzTitle: 'This is a notification message',
      nzContent: this.notificationcontent
    });
    //setTimeout(() => modal.destroy(), 1000);
  }

  closemodal(){
    this.modal.destroy();
  }

  
  
}
