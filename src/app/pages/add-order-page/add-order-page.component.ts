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
    console.log("Adding order");
    this.orderList = this.shared.getAddOrderTableData();
    
    this.validateAll();
    
    // let fullOrder = this.getOrderObj()

    // this.addOrderService.addOrder(fullOrder)
  }

  validateAll(){
    //Validating Order Details
    this.InvoiceNo = this.validateInt(this.InvoiceNo);
    this.OrderNo = this.validateInt(this.OrderNo);
    this.SuplierRefNo = this.validateInt(this.SuplierRefNo);
    if(!this.isValidDate(this.SupplyDate)){this.SupplyDate = this.SupplyDate + "<- Invalid Date";}
    this.SupplyTime = this.validateTime(this.SupplyTime);

  }

  validateTime(time : string){
    let split_time = time.split(" ")
    if(split_time.length != 2){return time + "<- Invalid Time"}

    if (split_time[0].match('^(0?[1-9]|1[012]):[0-5][0-9]$') ===  undefined){ return time + "<- Invalid 12h Time" }
    if(!(split_time[1].toLowerCase() == "am") || !(split_time[1].toLowerCase() == "pm")){return time + "<- Invalid am/pm"}
    if(split_time[1].toLowerCase() == "am"){return split_time[0] + " AM"}
    if(split_time[1].toLowerCase() == "pm"){return split_time[0] + " PM"}
  }

  validateInt(num : any){
    if(isNaN(num)){return num + "<- INVALID"}
    return num;
  }

  isValidDate(dateString)
  {
      // First check for the pattern
      if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
          return false;

      // Parse the date parts to integers
      var parts = dateString.split("/");
      var day = parseInt(parts[1], 10);
      var month = parseInt(parts[0], 10);
      var year = parseInt(parts[2], 10);

      // Check the ranges of month and year
      if(year < 1000 || year > 3000 || month == 0 || month > 12)
          return false;

      var monthLength = [ 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ];

      // Adjust for leap years
      if(year % 400 == 0 || (year % 100 != 0 && year % 4 == 0))
          monthLength[1] = 29;

      // Check the range of the day
      return day > 0 && day <= monthLength[month - 1];
  };



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
      "invoiceNo" : Number.parseInt(this.InvoiceNo),
      "orderDate" : this.CurrentDate,
      "supplyDate" : this.SupplyDate,
      "orderNo" : Number.parseInt(this.OrderNo),
      "supplyRefNo" : Number.parseInt(this.SuplierRefNo)
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
