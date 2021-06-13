import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperServiceService {

  constructor() { }


  getCurrentDate(){
    let date = new Date()
    let month =  date.getMonth() + 1 ;
    let today = date.getDate() + "/" + month + "/" + date.getFullYear()
    return today
  }

  getCurrentDateUnderscore(){
    return this.getCurrentDate().replace(/\//g, "_")
  }
}
