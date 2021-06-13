import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Interfaces/order';
import { AddOrderService } from 'src/app/services/add-order.service';
import { HelperServiceService } from 'src/app/services/helper-service.service';
import { PayloadConverterService } from 'src/app/services/payload-converter.service';

interface SalesSummeryItem {
  ProductName : string;
  Qty :number;
  TotalErnings:number;
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

  constructor(
    private fb : AddOrderService,
    private helpServ : HelperServiceService,
    private converter : PayloadConverterService
  ) { }
  listOfData: SalesSummeryItem[] = [];

  // ProductName : 'p1',
  // Qty :'300',
  // TotalErnings:'5000',
  // Date :'11/05/2021'

  ngOnInit(): void {
    this.fetchTodaysOrders()
  }

  reset(): void {
    this.searchValue = '';
    this.search();
  }

  search(): void {
    this.visible = false;
    this.listOfData = this.listOfData.filter((item: SalesSummeryItem) => item.ProductName.indexOf(this.searchValue) !== -1);
  }

  orders : Order[] = [];
  fetchTodaysOrders(){
    return this.fb.getOrderDateDoc().collection(this.helpServ.getCurrentDateUnderscore()).get().subscribe(data =>{
      if(data.docs.length == 0) return

      data.docs.forEach((doc)=>{
        this.orders.push(this.converter.toOrder(doc.data()))        
      })
      this.calculateRevenue()
    })
  }

  calculateRevenue(){
    // REVENUE IS SHOWN ONLY FOR A SINGLE DAY
    this.listOfData = []

    this.orders.forEach((order)=>{
      order.productOrders.forEach((product)=>{
        if(!this.prodAdded(product.ProductCode)){
          //Add Prod To List
          let item : SalesSummeryItem = {
            "ProductName" : product.ProductCode,
            "Qty" : 0,
            "TotalErnings" : 0,
            "Date" : order.orderDetails.orderDate
          }
          this.listOfData.push(item)
        }

        //Do The Additions
        let displayProd = this.listOfData.find((item : SalesSummeryItem) => item.ProductName == product.ProductCode);
        displayProd.Qty += product.Qty;
        displayProd.TotalErnings += product.Price;
      })
    })

  }



  prodAdded(prodName){
    //Checks if product is added to the list
    let productExists = false
    this.listOfData.forEach((data)=>{
      if(data.ProductName.toString() == prodName.toString()) productExists = true
    })
    return productExists
  }


}
