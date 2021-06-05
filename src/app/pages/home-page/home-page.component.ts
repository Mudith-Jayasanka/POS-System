import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  Customercount:string;
  OrderCount:string;

  constructor() { }

  ngOnInit(): void {
    this.Customercount='420';
    this.OrderCount = '069'

  }

}
