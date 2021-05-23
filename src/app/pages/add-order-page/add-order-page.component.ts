import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Interfaces/product';
import { ProductOrder } from 'src/app/Interfaces/product-order';
import { AddOrderService } from 'src/app/services/add-order.service';
import { SharedAddOrederpageService } from 'src/app/services/shared-add-orederpage.service';


@Component({
  selector: 'app-add-order-page',
  templateUrl: './add-order-page.component.html',
  styleUrls: ['./add-order-page.component.css']
})
export class AddOrderPageComponent implements OnInit {

  CurrentDate :string;
  OrderNo : string;
  InvoiceNo :string;
  SupplyDate :string;
  SupplyTime:string;
  SuplierRefNo :string;
  SearchCustomer:string;
  Name:string;
  Phone:string;
  Address:string;
  Email:string;
  Discount:string;
  PreparedBy:string;
  ApprovedBy:string;
  SubTotal:string;
  DiscontShow:string;
  Total:string;

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  constructor(private addOrderService : AddOrderService , private shared :SharedAddOrederpageService) { }

  listOfData: ProductOrder[] = [];

  ngOnInit(): void {
    this.SubTotal='0000.00';
    this.DiscontShow='0000.00';
    this.Total='0000.00';
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }

  addOrder(){
    console.log("clicked")
    let data = {
      "name" : "Mark",
      "age" : 21,
      "phone" : "0773353163"
    }
    this.addOrderService.addSomething("MarkiMoo" , data)
  }

  getdata(){
    this.listOfData = this.shared.getAddOrderTableData();
    console.log(this.listOfData)

    let productData : Product;
    productData = {
      "code" : "BR-R-C2",
      "foodType" : "C",
      "menu" : ["Chicken Biriyani" , "Roast Chicken" , "Cashew Curry" , "B&F Eggs" , "M/ Fish Sambol" , "Koroma Curry"],
      "packsAmt" : 2,
      "price" : 2000
    }
    this.addOrderService.addProduct(productData);

  }


}
