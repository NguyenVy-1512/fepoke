import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService, AlertService, ApiService } from '../app/shared';
import { User, products } from '../app/_models';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pokeso';
  quantity: number[] = [];
  totalproduct: number =0;
  constructor(private router: Router, private data: DataService) { }
 
  ngOnInit() {
      this.router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
              return;
          }
          window.scrollTo(0, 0)
          
      });
   
    this.data.currentquantity.subscribe(quantity => this.quantity = quantity);
    for(var i = 0; i< this.quantity.length ; i++)
    {
      this.totalproduct = this.totalproduct + this.quantity[i];
    }
  }
}