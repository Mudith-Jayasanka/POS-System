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

  listOfOption: Array<{ label: string; value: string }> = [];
  listOfTagOptions = [];

  constructor(private shared : SharedAddOrederpageService) { }

  listOfData: ProductOrder[] = [];

  addRow(): void {
    this.listOfData = [
      ...this.listOfData,
      {
        ProductCode: `${this.SelectedProductCode}`,
        Menu: `buriyani`,
        Rate: 320,
        Qty: 10,
        Price: this.SelectedQty
      }
    ];
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
