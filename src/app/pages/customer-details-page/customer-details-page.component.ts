import { Component, OnInit } from '@angular/core';

interface OrderHistoryItem {
  name : string;
  phone :string;
  address:string;
  email:string;

}

@Component({
  selector: 'app-customer-details-page',
  templateUrl: './customer-details-page.component.html',
  styleUrls: ['./customer-details-page.component.css']
})
export class CustomerDetailsPageComponent implements OnInit {
  isVisible = false;
  searchValue = '';
  visible = false;

  Searchname:string; //search input

  constructor() { }

  ngOnInit(): void {
  }

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

  listOfData: OrderHistoryItem[] = [
    {
      name : 'Tom Ellis1',
      phone : '0771',
      address:'colombo',
      email: 'TomEllis@gmail.com',
    },
    {
      name : 'Tom Ellis2',
      phone : '0772',
      address:'colombo',
      email: 'TomEllis@gmail.com',
    },
    {
      name : 'Tom Ellis3',
      phone : '0773',
      address:'colombo',
      email: 'TomEllis@gmail.com',
    },
    {
      name : 'Tom Ellis4',
      phone : '0774',
      address:'colombo',
      email: 'TomEllis@gmail.com',
    }
    
  ];
  listOfDisplayData = [...this.listOfData];

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.phone !== id);
  }

  searchcustomer(){

  }

}
