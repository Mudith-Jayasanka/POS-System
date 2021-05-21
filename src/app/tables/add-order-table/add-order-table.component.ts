import { Component, OnInit } from '@angular/core';

interface ItemData {
  ProductCode: string;
  Menu: string;
  Rate: Number;
  Qty:number;
  Price: string;
}

@Component({
  selector: 'app-add-order-table',
  templateUrl: './add-order-table.component.html',
  styleUrls: ['./add-order-table.component.css']
})
export class AddOrderTableComponent implements OnInit {

  SelectedProductCode :string;
  SelectedQty :number;

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];
  constructor() { }

  i = 0;
  listOfData: ItemData[] = [];


  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        ProductCode: `${this.SelectedProductCode}`,
        Menu: `buriyani`,
        Rate: 320,
        Qty: 10,
        Price: `${this.SelectedQty}`
      }
    ];
    this.i++;
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.ProductCode !== id);
  }

  ngOnInit(): void {
    
    const children: Array<{ label: string; value: string }> = [];
    for (let i = 10; i < 36; i++) {
      children.push({ label: i.toString(36) + i, value: i.toString(36) + i });
    }
    this.listOfOption = children;
  }

}
