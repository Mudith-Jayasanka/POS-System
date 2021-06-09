import { Component, OnInit } from '@angular/core';
import { Offer } from 'src/app/Interfaces/offer';
import { AddOrderService } from 'src/app/services/add-order.service';
import { PayloadConverterService } from 'src/app/services/payload-converter.service';
import { StringFormatService } from 'src/app/services/string-format.service';

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


  constructor(
    private fb : AddOrderService,
    private payloadConverter : PayloadConverterService,
    private strFormatter : StringFormatService
    ) { }

  ngOnInit(): void {
  }

  showModal(): void {
    this.isVisible = true;

    // Show model is what triggers the display of model, Not NgOninit, According to current implementation
    if(this.listOfData.length > 0) {console.log("Data Already loaded , Skipping Fetch") ; return}

    this.fetchAllOffers();
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

  listOfData = [];

  listOfDisplayData = [...this.listOfData];

  deleteRow(id: string): void {
    //Remove Record From Firestore
    this.fb.getProductOffer().doc(id).delete();
    this.fb.getProduct().doc(id).delete();

    //Remove Record from table
    this.listOfData = this.listOfData.filter(d => d.OfferCode!== id);
  }

  searchOffer(){
    //for the search
    this.fb.getProductOfferCollection().collection('data',ref=>ref.where('OfferName',"==",this.searchValue.toUpperCase())).get().subscribe((data)=>{
      if(data.docs.length < 1) return

      this.listOfData = [];
      data.docs.forEach((document)=>{
        this.listOfData.push(this.getEditedOffer(document))
      })
      
    })
  }

  fetchAllOffers(){
    //fetching all offers with the assumption that there wont be too many offers
    // console.log("Fetching")
    this.fb.getProductOffer().get().subscribe((data)=>{
      if(data.docs.length < 1)return

      this.listOfData = []
      data.docs.forEach((data)=>{
        let EditedOffer = this.getEditedOffer(data)

        this.listOfData.push(EditedOffer)
      })
    });
  }


  getEditedOffer(data){
    //Edited offer for displaying in table
    let offer : Offer = this.payloadConverter.toOffer(data.data());
    let prodNameList : string[] = [];

    offer.offerProducts.forEach((prod)=>{
      prodNameList.push(prod.productName)
    })

    let EditedOffer = {
      "OfferCode": offer.OfferCode,
      "OfferName": this.strFormatter.capitalizeFirstLetter(offer.OfferName.toLocaleLowerCase()),
      "offerProducts": prodNameList
    }
    return EditedOffer
  }

}
