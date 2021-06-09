import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Interfaces/product';
import { AddOrderService } from 'src/app/services/add-order.service';
import { PayloadConverterService } from 'src/app/services/payload-converter.service';
import { StringFormatService } from 'src/app/services/string-format.service';

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

  constructor(
    private fb : AddOrderService,
    private payloadConverter : PayloadConverterService,
    private strFormatter : StringFormatService
    ) { }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isVisible = true;

    // if data already loaded
    if(this.listOfData.length > 0) return

    //load
    this.fetchProducts()
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }


  listOfData: Product[] = [];

  listOfDisplayData = [...this.listOfData];

  deleteRow(id: string): void {
    //Deleting from table
    this.listOfData = this.listOfData.filter(d => d.generatedCode!== id);

    //Deleting from Firestore
    this.fb.deleteProduct(id).then(()=>{console.log("Deleted : " + id)})
  }

  searchProduct(){
    //for the search
    this.searchValue = this.strFormatter.capitalizeName(this.searchValue)
    console.log("Searching For : " + "'"+this.searchValue+"'")
    this.fb.getProductDoc().collection("data" , ref=>ref.where("prodName","==",this.searchValue)).get().subscribe((data)=>{
      console.log(data.docs)
      if(data.docs.length  < 1 || data.docs === undefined) {console.log("Not Found");return}

      this.listOfData = []
      data.forEach((record)=>{
        this.listOfData.push(this.payloadConverter.toProuct(record.data()))
      })
    })
  }

  fetchProducts(){
    this.fb.getProductDoc().collection("data" , ref=>ref.limit(10)).get().subscribe((data)=>{
      if(data.docs.length < 1) {console.log("NO DATA")  ;return}

      this.listOfData = []
      let payload = data.docs
      payload.forEach((product)=>{
        this.listOfData.push(this.payloadConverter.toProuct(product.data()));
      })
    })
  }

}
