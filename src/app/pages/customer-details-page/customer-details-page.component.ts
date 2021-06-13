import { Component, OnInit } from '@angular/core';
import { CustomerDetails } from 'src/app/Interfaces/customer-details';
import { AddOrderService } from 'src/app/services/add-order.service';
import { PayloadConverterService } from 'src/app/services/payload-converter.service';

@Component({
  selector: 'app-customer-details-page',
  templateUrl: './customer-details-page.component.html',
  styleUrls: ['./customer-details-page.component.css']
})
export class CustomerDetailsPageComponent implements OnInit {
  isVisible = false;
  searchValue = '';
  visible = false;

  searchPhone : string;

  constructor(
    private fb : AddOrderService,
    private payloadConverter : PayloadConverterService
  ) { }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isVisible = true;

    console.log("Fetching Customers")
    if(this.listOfData.length > 0) {console.log("Already Fetched") ;return}
    this.fetchCustomers();
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  listOfData: CustomerDetails[] = [];

  deleteRow(phoneNum: string): void {
    //Removing From Display
    console.log("Deleting :"+phoneNum)
    this.listOfData = this.listOfData.filter(d => d.phone !== phoneNum);

    //Removing from Firebase
    this.fb.deleteCustomer(phoneNum)
  }

  searchcustomer(){
    if(this.searchPhone == ""){
      this.fetchCustomers()
      return
    }

    this.fb.getCustomerCollection().doc(this.searchPhone).get().subscribe((data)=>{
      if(!data.exists) return

      this.listOfData = []
      this.listOfData.push(this.payloadConverter.toCustomerDetaills(data.data()))
    })
  }

  fetchCustomers(){
    this.fb.getCustomerDoc().collection("Customers" , ref=> ref.limit(10)).get().subscribe((data)=>{
      this.listOfData  = []
      data.forEach((record)=>{
        if(!record.exists) return

        this.listOfData.push(this.payloadConverter.toCustomerDetaills(record.data()))
      })
    });
  }

}
