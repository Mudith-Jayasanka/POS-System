import { Component, OnInit } from '@angular/core';

interface DataItem {
  name: string;
  phoneNumber: string;
  address: string;
}

@Component({
  selector: 'app-customer-table',
  templateUrl: './customer-table.component.html',
  styleUrls: ['./customer-table.component.css']
})
export class CustomerTableComponent implements OnInit {
  searchValue = '';
  visible = false;
  listOfData: DataItem[] = [
    {
      name: 'John Brown',
      phoneNumber: '07777333',
      address: 'New York No. 1 Lake Park'
    },
    {
      name: 'Jim Green',
      phoneNumber:'07777444',
      address: 'London No. 1 Lake Park'
    },
    {
      name: 'Joe Black',
      phoneNumber: '07777555',
      address: 'Sidney No. 1 Lake Park'
    },
    {
      name: 'Jim Red',
      phoneNumber: '07777666',
      address: 'London No. 2 Lake Park'
    }
  ];
  listOfDisplayData = [...this.listOfData];
  constructor() { }

  ngOnInit(): void {
  }
  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfDisplayData = this.listOfData.filter((item: DataItem) => item.name.indexOf(this.searchValue) !== -1);
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.phoneNumber !== id);
  }
  

}
