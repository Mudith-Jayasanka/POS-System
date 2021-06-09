import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringFormatService {

  constructor() { }


  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  capitalizeName(str) : string{
    //Capitalizes each word's first letter
    let words = str.split(" ")
    let formatted = ""
    words.forEach((word)=>{
      formatted += this.capitalizeFirstLetter(word) + " "
    })
    return formatted.trim()
  }
  
}
