import { Component, OnInit } from '@angular/core';

interface SalesSummeryItem {
  ProductName : string;
  Qty :string;
  TotalErnings:string;
  Date :string;

}
@Component({
  selector: 'app-sales-summery',
  templateUrl: './sales-summery.component.html',
  styleUrls: ['./sales-summery.component.css']
})
export class SalesSummeryComponent implements OnInit {

  searchValue = '';
  visible = false;

  constructor() { }
listOfData: SalesSummeryItem[] = [
    {
      ProductName : 'p1',
      Qty :'300',
      TotalErnings:'5000',
      Date :'11/05/2021'
    },
    {
      ProductName : 'p2',
      Qty :'400',
      TotalErnings:'7000',
      Date :'11/05/2021'
    },
    {
      ProductName : 'p3',
      Qty :'3000',
      TotalErnings:'20000',
      Date :'11/05/2021'
    },
    {
      ProductName : 'p3',
      Qty :'3000',
      TotalErnings:'20000',
      Date :'11/05/2021'
    },
    {
      ProductName : 'p3',
      Qty :'3000',
      TotalErnings:'20000',
      Date :'11/05/2021'
    },
    {
      ProductName : 'p3',
      Qty :'3000',
      TotalErnings:'20000',
      Date :'11/05/2021'
    },
    {
      ProductName : 'p3',
      Qty :'3000',
      TotalErnings:'20000',
      Date :'11/05/2021'
    },
    {
      ProductName : 'p3',
      Qty :'3000',
      TotalErnings:'20000',
      Date :'11/05/2021'
    },
    {
      ProductName : 'p3',
      Qty :'3000',
      TotalErnings:'20000',
      Date :'11/05/2021'
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
    this.listOfDisplayData = this.listOfData.filter((item: SalesSummeryItem) => item.ProductName.indexOf(this.searchValue) !== -1);
  }

}
