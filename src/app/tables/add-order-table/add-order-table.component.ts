import { Component, OnInit } from '@angular/core';
import { ProductOrder } from 'src/app/Interfaces/product-order';
import { AddOrderService } from 'src/app/services/add-order.service';
import { SharedAddOrederpageService } from 'src/app/services/shared-add-orederpage.service';




@Component({
  selector: 'app-add-order-table',
  templateUrl: './add-order-table.component.html',
  styleUrls: ['./add-order-table.component.css']
})
export class AddOrderTableComponent implements OnInit {

  SelectedProductCode :string;
  SelectedQty :number;

  constructor(private shared : SharedAddOrederpageService , private firebase : AddOrderService) { }

  listOfData: ProductOrder[] = [];

  addRow(){

    this.listOfData = [
      ...this.listOfData,
      {
        ProductCode: `${this.SelectedProductCode}`,
        Menu: this.fb_menu,
        Rate: this.fb_rate,
        Qty: this.SelectedQty,
        Price: this.calc_price
      }
    ];
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.ProductCode !== id);
  }

  ngOnInit(): void { 
    this.sendData();

  }

  pageExit : boolean = false;
  sendData(){
    if (this.pageExit){return}
    setTimeout(()=>{
      this.shared.setAddOrderTableData(this.listOfData);
      this.sendData();
    },250)
  }

  ngOnDestroy(){
    this.pageExit = true;
  }

  validInt(str : any){
    //check if str is a valid int
    return str >>> 0 === parseFloat(str);
  }
  
  fb_menu : string;
  fb_rate : number;
  calc_price : number;

  validID(){
    return this.firebase.getProduct().doc(this.SelectedProductCode).get().subscribe((data) =>{
      if(data.exists){
        let product = data.data();
        this.fb_menu = product["prodName"]; // GETTTING PRODUCT NAME FOR "Menu" for now
        this.fb_rate = product["price"];
        this.calc_price = this.fb_rate * this.SelectedQty;
        this.addRow()
      }else{
        this.SelectedProductCode = "invalid Code"
      }
    })
  }

  validateAndAdd(){
    if(!this.validInt(this.SelectedQty)){
      this.SelectedQty = undefined;
      return false
    }
    this.validID()
  }


}
