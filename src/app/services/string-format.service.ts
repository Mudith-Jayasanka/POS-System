import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StringFormatService {

  constructor() { }


  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  capitalizeName(){
    //Capitalizes each word's first letter
    
  }
  
}
