import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  listOfData: OrderHistoryItem[] = [
    {
      OrderNo : '0001',
      InvoiceNo : '10001',
      CustomerName:'Robert Blake',
      ApprovedBy: 'Tom Ellis',
      PreparedBy: 'Jonh Brown',
      Total: '2000', 
      Date : '02/02/2021'
    },
    {
      OrderNo : '0002',
      InvoiceNo : '10002',
      CustomerName:'dean roberts',
      ApprovedBy: 'Tom Ellis',
      PreparedBy: 'Jack Black',
      Total: '4200', 
      Date : '02/02/2021'
    },
    {
      OrderNo : '0003',
      InvoiceNo : '10003',
      CustomerName:'Adm evens',
      ApprovedBy: 'Tom Ellis',
      PreparedBy: 'Jill Green',
      Total: '6900', 
      Date : '02/02/2021'
    }
  ];
  listOfDisplayData = [...this.listOfData];

  ngOnInit(): void {

  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: OrderHistoryItem) => item.CustomerName.indexOf(this.searchValue) !== -1);
  }

}
