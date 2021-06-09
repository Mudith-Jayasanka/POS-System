import { Component, OnInit } from '@angular/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Offer } from 'src/app/Interfaces/offer';
import { OfferProductDetails } from 'src/app/Interfaces/offer-product-details';
import { AddOrderService } from 'src/app/services/add-order.service';


@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent implements OnInit {

  OfferName:string;
  OfferCode:string;
  OfferUnitPrice:string;
  AdditionalInfo:string = "";

  ProductCode : string; 

  constructor(private fb : AddOrderService,private modalService: NzModalService) { }

  listOfData: OfferProductDetails[] = [];

  ngOnInit(): void {
  }

  addRow(): void {
    //if(!this.packDataSet()) return
    //if(this.currentPackAdded()) return
    this.fb.getProduct().doc(this.ProductCode.toUpperCase()).get().subscribe((data)=>{
      if(!data.exists) return

      this.ProductCode = ""; //Clearing Text

      let allData = data.data()
      this.listOfData = [
        ...this.listOfData,
        {
          productCode : allData["generatedCode"],
          productName : allData["prodName"],
          price: allData["price"],
          additionalInfo: allData["additionalInfo"] 
        }
      ];
    })
    
    

  }


  deleteRow(prodCode){
    this.listOfData = this.listOfData.filter(d => d.productCode !== prodCode);
  }

  addOffer(){
    if(!this.validateAll()) return
    
    this.validateOfferFirebase()
    .then( codeExists => {
      if(!codeExists) return
      
      let offer = this.getOfferObj()
      this.fb.getProduct().doc(this.OfferCode).set(offer)
      this.fb.getProductOffer().doc(this.OfferCode).set(offer)
    });
  }

  validateAll(){
    if(!this.isSame(this.OfferName , this.validateStr(this.OfferName))) {this.OfferName = this.validateStr(this.OfferName);return false}
    if(!this.isSame(this.OfferCode , this.validateStr(this.OfferCode))) {this.OfferCode = this.validateStr(this.OfferCode);return false}
    if(!this.isSame(this.OfferUnitPrice , this.validateInt(this.OfferUnitPrice))) {this.OfferUnitPrice = this.validateInt(this.OfferUnitPrice);return false}
    if(this.listOfData.length < 1) return false
    return true
  }

  validateStr(str){
    if(str === undefined) return str + "<- INVALID"
    if(/INVALID|</.test(str)) return str + "<- INVALID"
    if(str == ""){return str + "<- INVALID"}
    return str;
  }

  validateOfferFirebase(){
    //Checks firebase to see if there are any products with the same code
    return this.fb.getProduct().doc(this.OfferCode).get().toPromise()
    .then(
      res => {
        if(res.exists) {
          this.OfferCode = ""
          return false
        }
        return true
      }
    )
  }

  validateInt(num : any){
    if(num === undefined) return num + "<- INVALID"
    if(num == "") return + "<- INVALID"
    if(isNaN(num)){return num + "<- INVALID"}
    return num;
  }

  isSame(a,b){
    if(a == b)return true
    return false
  }

  getOfferObj(){
    //Offers are considered as regular products to the system
    let offer : Offer = {
      "OfferName" : this.OfferName.toUpperCase(),
      "OfferCode" : this.OfferCode,
      "OfferUnitPrice" : this.OfferUnitPrice,
      "AdditionalInfo" : this.AdditionalInfo,
      "offerProducts" : this.listOfData
    }
    return offer
  }

  notificationcontent:string;
  modal : any
  success(): void {
    this.modal = this.modalService.success({
      nzTitle: 'This is a notification message',
      nzContent: this.notificationcontent
    });
    //setTimeout(() => modal.destroy(), 1000);
  }

  closemodal(){
    this.modal.destroy();
  }


}
