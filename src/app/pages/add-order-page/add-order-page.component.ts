import { Component, OnInit } from '@angular/core';

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
  constructor() { }

  ngOnInit(): void {
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }

}
