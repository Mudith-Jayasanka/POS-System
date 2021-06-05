import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NgxPrinterService } from 'ngx-printer';
import { CustomerDetails } from 'src/app/Interfaces/customer-details';
import { Order } from 'src/app/Interfaces/order';
import { OrderDetails } from 'src/app/Interfaces/order-details';
import { OtherOrderInfo } from 'src/app/Interfaces/other-order-info';
import { Product } from 'src/app/Interfaces/product';
import { ProductOrder } from 'src/app/Interfaces/product-order';
import { AddOrderService } from 'src/app/services/add-order.service';
import { SharedAddOrederpageService } from 'src/app/services/shared-add-orederpage.service';

//for test
interface OrderHistoryItem {
  offerName : string;
  offerCode :string;
  products : string;
}

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
  SupplyTime2:string;
  SuplierRefNo :string;
  SearchCustomer:string;
  Name:string;
  Phone:string;
  Address:string;
  Email:string;
  Discount:number;
  PreparedBy:string;
  ApprovedBy:string;
  SubTotal:string;
  DiscontShow:string;
  Total:string;

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  constructor(private addOrderService : AddOrderService , private shared :SharedAddOrederpageService ,private printerService: NgxPrinterService,private modalService: NzModalService) { }
  isVisible = false;
  orderList: ProductOrder[] = [];

  ngOnInit(): void {
    this.setCurrentDate()
    this.SupplyTime2 = "AM" //Default picked 
    this.SubTotal='0000.00';
    this.DiscontShow='0000.00';
    this.Total='0000.00';
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;

    this.Discount = 0;
    this.updateOrderList();
  }

  setCurrentDate(){
    let date = new Date()
    let month =  date.getMonth() + 1 ;
    let today = date.getDate() + "/" + month + "/" + date.getFullYear()
    this.CurrentDate = today;
  }

  addOrder(){
    console.log("Adding order");
    
    if(!this.validateAll()) return
    
    let fullOrder = this.getOrderObj();

    
    this.addOrderService.getOrderCollection().doc("Customer_Sorted").collection(fullOrder.customerDetails.phone.toString())
    .doc(fullOrder.orderDetails.orderNo.toString()).set(fullOrder);
    this.addOrderService.getOrderCollection().doc("Date_Sorted").collection(fullOrder.orderDetails.orderDate.toString().replace(/\//g, "_"))
    .doc(fullOrder.orderDetails.orderNo.toString()).set(fullOrder);
  }

  validateAll(){
    //Validating Order Details
    if(!this.isSame(this.InvoiceNo , this.validateInt(this.InvoiceNo))) {this.InvoiceNo = this.validateInt(this.InvoiceNo);return false}
    if(!this.isSame(this.OrderNo , this.validateInt(this.OrderNo))) {this.OrderNo = this.validateInt(this.OrderNo);return false}
    if(!this.isSame(this.SuplierRefNo , this.validateInt(this.SuplierRefNo))) {this.SuplierRefNo = this.validateInt(this.SuplierRefNo);return false}
    if(!this.isSame(this.SupplyTime , this.validateTime(this.SupplyTime))) {this.SupplyTime = this.validateTime(this.SupplyTime);return false}

    let validDate = this.isValidDate(this.SupplyDate)
    if(validDate != undefined){
      if(!validDate){this.SupplyDate = this.SupplyDate + "<- Invalid Date"; return false}
    }
    if(!this.validate_detail()) return false
    return true

  }

  isSame(a,b){
    if(a == b)return true
    return false
  }

  validate_detail(){
    //Validate approved by and Prepared by
    if(this.ApprovedBy === undefined) return false
    if(this.ApprovedBy == "") return false
    if(this.PreparedBy === undefined) return false
    if(this.PreparedBy == "") return false
    return true
  }

  validateTime(time : string){
    if (time === undefined ) {this.SupplyTime = this.SupplyTime + "<- Invalid" ; return undefined}
    if (time.match('^(0?[1-9]|1[012]):[0-5][0-9]$') ==  null){return time + "<- Invalid Time" }
    return time
  }

  validateInt(num : any){
    if(num === undefined) return num + "<- INVALID"
    if(isNaN(num)){return num + "<- INVALID"}
    return num;
  }

  isValidDate(dateString){
    if(dateString === undefined) return undefined
    // First check for the pattern
    if(!/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString))
        return false;

    // Parse the date parts to integers
    var parts = dateString.split("/");
    var day = parseInt(parts[0], 10);
    var month = parseInt(parts[1], 10);
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
      "supplyRefNo" : Number.parseInt(this.SuplierRefNo),
      "supplyTime" : this.SupplyTime
    }

    let otherInfo : OtherOrderInfo;
    if(this.Discount === undefined) {this.Discount = 0;}
    otherInfo = {
      "discount" : this.Discount.toString(),
      "approvedBy" : this.ApprovedBy,
      "preparedBy" : this.PreparedBy,
      "subTotal" : this.SubTotal,
      "total" : this.Total
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

  addCustomer(Customer : CustomerDetails){
    this.addOrderService.addCustomer().doc(Customer.phone.toString()).get().subscribe((data)=>{
      if(!data.exists){
        //Create New Customer
        this.addOrderService.addCustomer().doc(Customer.phone.toString()).set(Customer)
      }
    });
  }

  searchCustomer(){
    if(this.SearchCustomer === undefined) return
    this.addOrderService.addCustomer().doc(this.SearchCustomer.toString()).get().subscribe((data)=>{
      if(data.exists){
        let user = data.data()
        this.Name = user["customerName"]
        this.Address = user["address"]
        this.Email = user["email"]
        this.Phone = user["phone"]
      }else{
        console.log(this.SearchCustomer + " Not Found")
      }
    });
  }

  pageActive :boolean = true
  updateOrderList(){
    if(!this.pageActive) return
    setTimeout(()=>{
      this.orderList = this.shared.getAddOrderTableData();
      this.updateCalculations()
      this.updateOrderList()
    } , 250);
  }

  ngOnDestroy(): void {
    this.pageActive = false;
  }

  updateCalculations(){
    //Calculate sums and discounts
    if(Number.isNaN(this.Discount)) return
    let subTot : number = 0
    this.orderList.forEach((order)=>{
      subTot = subTot + order.Price
    });
    this.SubTotal = subTot.toString();
    this.DiscontShow = this.Discount.toString();
    this.Total = (subTot - this.Discount).toString()
  }

  //methods for modal
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  //method to print
  print(){
    this.printerService.printDiv('print-section');
  }

  listOfData: OrderHistoryItem[] = [
    {
      offerName : 'offer1',
      offerCode : '9001',
      products :'RP-B-m-3 , Yk-m-c-1',
      
    },
    {
      offerName : 'offer2',
      offerCode : '9002',
      products :'RP-B-m-3 , Yk-m-c-1',
      
    },
    {
      offerName : 'offer3',
      offerCode : '9003',
      products :'RP-B-m-3 , Yk-m-c-1',
      
    }
    
  ];


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
