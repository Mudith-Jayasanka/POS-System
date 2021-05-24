import { Component, OnInit } from '@angular/core';
import { ProductOrder } from 'src/app/Interfaces/product-order';
import { SharedAddOrederpageService } from 'src/app/services/shared-add-orederpage.service';




@Component({
  selector: 'app-add-order-table',
  templateUrl: './add-order-table.component.html',
  styleUrls: ['./add-order-table.component.css']
})
export class AddOrderTableComponent implements OnInit {

  SelectedProductCode :string;
  SelectedQty :number;

  constructor(private shared : SharedAddOrederpageService) { }

  listOfData: ProductOrder[] = [];

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        ProductCode: `${this.SelectedProductCode}`,
        Menu: `buriyani`,
        Rate: 320,
        Qty: this.SelectedQty,
        Price: 5 
      }
    ];
  }

  deleteRow(id: string): void {
    this.listOfData = this.listOfData.filter(d => d.ProductCode !== id);
  }

  ngOnInit(): void { 
    this.sendData();

  }

  pageExit : boolean = false;
  sendData(){
    if (this.pageExit){return}
    setTimeout(()=>{
      this.shared.setAddOrderTableData(this.listOfData);
      this.sendData();
    },250)
  }

  ngOnDestroy(){
    this.pageExit = true;
  }

}
