import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AddOrderService {

  constructor(private angfire : AngularFirestore) { }


  addSomething(docName : any,data : any){
    return this.angfire.collection("RandomCollection").doc(docName).set(data)
  }
}
