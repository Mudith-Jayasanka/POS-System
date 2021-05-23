import { Component, OnInit } from '@angular/core';
import { CustomerDetails } from 'src/app/Interfaces/customer-details';
import { Order } from 'src/app/Interfaces/order';
import { OrderDetails } from 'src/app/Interfaces/order-details';
import { OtherOrderInfo } from 'src/app/Interfaces/other-order-info';
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
  OrderNo : Number;
  InvoiceNo :Number;
  SupplyDate :string;
  SupplyTime:string;
  SuplierRefNo :Number;
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

  orderList: ProductOrder[] = [];

  ngOnInit(): void {
    this.setCurrentDate()
    this.SubTotal='0000.00';
    this.DiscontShow='0000.00';
    this.Total='0000.00';
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }

  setCurrentDate(){
    let date = new Date()
    let month =  date.getMonth() + 1 ;
    let today = date.getDate() + "/" + month + "/" + date.getFullYear()
    this.CurrentDate = today;
  }

  addOrder(){
    console.log("Adding order")
    this.orderList = this.shared.getAddOrderTableData();
    
    let fullOrder = this.getOrderObj()

    this.addOrderService.addOrder(fullOrder)
  }

  getOrderObj(){
    let customerDetails : CustomerDetails;
    customerDetails = {
      "address" : this.Address,
      "customerName" : this.Name,
      "email" : this.Email,
      "phone" : this.Phone
    }

    let orderDetails : OrderDetails;
    orderDetails = {
      "invoiceNo" : this.InvoiceNo,
      "orderDate" : this.CurrentDate,
      "supplyDate" : this.SupplyDate,
      "orderNo" : this.OrderNo,
      "supplyRefNo" : this.SuplierRefNo
    }

    let otherInfo : OtherOrderInfo;
    otherInfo = {
      "discount" : this.Discount,
      "approvedBy" : this.ApprovedBy,
      "preparedBy" : this.PreparedBy
    }


    let order : Order;
    order = {
      "customerDetails" : customerDetails,
      "orderDetails" : orderDetails,
      "productOrders" : this.orderList,
      "otherInfo" : otherInfo
    }
    return order
  }

  getdata(){


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
