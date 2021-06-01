import { Component, OnInit } from '@angular/core';

interface ViewProductsItem {
  ProductName : string;
  ProductCode :string;
  ProductPrice : string;
}

@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.css']
})
export class ViewProductsComponent implements OnInit {

  isVisible = false;
  searchValue = '';
  visible = false;

  SearchProduct:string;//for the search

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


  listOfData: ViewProductsItem[] = [
    {
      ProductName : 'Buriyani',
      ProductCode : 'BR-C-1',
      ProductPrice :'1000'
    },
    {
      ProductName : 'Buriyani royal pack',
      ProductCode : 'BR-P-C-2',
      ProductPrice :'2000'
      
    },
    {
      ProductName : 'buriyani family pack',
      ProductCode : 'BR-F-M-10',
      ProductPrice :'10000'
      
    }
    
  ];

  listOfDisplayData = [...this.listOfData];

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.ProductCode!== id);
  }

  searchProduct(){
    //for the search

  }

}
