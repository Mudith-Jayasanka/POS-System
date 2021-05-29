import { Component, OnInit } from '@angular/core';

interface OrderHistoryItem {
  offerName : string;
  offerCode :string;
  products : string;
}

@Component({
  selector: 'app-view-offers',
  templateUrl: './view-offers.component.html',
  styleUrls: ['./view-offers.component.css']
})
export class ViewOffersComponent implements OnInit {

  isVisible = false;
  searchValue = '';
  visible = false;

  SearchOffer:string;//for the search


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

  listOfDisplayData = [...this.listOfData];

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.offerCode!== id);
  }

  searchOffer(){
    //for the search

  }

}
