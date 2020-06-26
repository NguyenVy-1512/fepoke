import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from '../shared';
import { products } from '../_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  product$: products[];
  products: products[];
  products1: products[];
  constructor(
    private productsServices: ApiService) { }
  ngOnInit() {
    this.productsServices.getProducts().subscribe((data) => {
      this.product$ = data;
      this.products = data;
      
      if(this.product$.length > 10)
      { var j = 0;
        for(var i = this.product$.length-1; i >= this.product$.length -10; i--){

          this.products[j] = this.product$[i];
          j++;
          console.log(j);
        }
        this.products.splice(9,this.product$.length - 10);
      };

      console.log(this.products);
    });

    this.productsServices.getProducts().subscribe((data) => {
      this.product$ = data;
      this.products1 = [];
      var k = 0;
      for(var l = 0; l< this.product$.length; l++)
      {
        if(this.product$[l].qty >= 5){
          this.products1[k] = this.product$[l];
          k++;
          console.log(k);
        }
      };
      console.log(this.products1);
      });
  }
  onSubmit(){
  }
}