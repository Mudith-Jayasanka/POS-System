import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  
  Customercount:string;
  OrderCount:string;

  constructor(
    public authService: AuthService
  ) { }

  ngOnInit(): void {
    this.Customercount='420';
    this.OrderCount = '069'

  }

}
