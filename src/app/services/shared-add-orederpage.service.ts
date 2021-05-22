import { Injectable } from '@angular/core';
import { ProductOrder } from '../Interfaces/product-order';

@Injectable({
  providedIn: 'root'
})
export class SharedAddOrederpageService {

  listOfData: ProductOrder[] = [];

  constructor() { }

  //set table array data
  setAddOrderTableData(arraydata){
    this.listOfData = arraydata;
  }

  //get table array data
  getAddOrderTableData(){
    return this.listOfData
  }


}
