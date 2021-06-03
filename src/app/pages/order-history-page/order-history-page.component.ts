import { Component, OnInit } from '@angular/core';
import { AddOrderService } from 'src/app/services/add-order.service';

interface OrderHistoryItem {
  OrderNo : string;
  InvoiceNo :string;
  CustomerName:string;//to show/store 'Name' of of add order
  ApprovedBy:string;
  PreparedBy:string;
  Total:string;
  Date :string; //to show/store 'CurrentDate' of add order

}

@Component({
  selector: 'app-order-history-page',
  templateUrl: './order-history-page.component.html',
  styleUrls: ['./order-history-page.component.css']
})
export class OrderHistoryPageComponent implements OnInit {

  searchValue = '';
  visible = false;

  constructor(private fb : AddOrderService) { }

  listOfDisplayData : OrderHistoryItem[]

  ngOnInit(): void {
    this.searchValue = this.getCurrentDate().replace(/\//g , "_")
    this.search()
  }

  getCurrentDate(){
    let date = new Date()
    let month =  date.getMonth() + 1 ;
    let today = date.getDate() + "/" + month + "/" + date.getFullYear()
    return today
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    console.log("Search Triggered")
    this.fb.getOrderDateDoc().collection(this.searchValue).get().subscribe((data)=>{
      this.listOfDisplayData = [];
      data.forEach((row) => {
        let order_record = row.data()
        let item : OrderHistoryItem = {
          OrderNo : order_record["orderDetails"]["orderNo"],
          InvoiceNo : order_record["orderDetails"]["invoiceNo"],
          CustomerName :order_record["customerDetails"]["customerName"],
          ApprovedBy :order_record["otherInfo"]["approvedBy"],
          PreparedBy :order_record["otherInfo"]["preparedBy"],
          "Total" :order_record["otherInfo"]["total"],
          "Date" :order_record["orderDetails"]["orderDate"]
        }
        this.listOfDisplayData.push(item)
      });
    })
  }

}
