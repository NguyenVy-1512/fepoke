import { Component, OnInit } from '@angular/core';
import { ApiService, DataService } from '../shared';
import { order, User, products } from '../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  user: User;
  token: string;
  orders: order[];
  products: products[] = [];
  p : products;
  constructor(private router: Router,
    private productsServices: ApiService,
    private data: DataService) { }

  ngOnInit() {
    this.data.currentuser.subscribe(user => this.user = user);
    this.data.currenttoken.subscribe(token => this.token = token);
    console.log(this.token);
    console.log(this.user._id);
    this.productsServices.getorderbyID(this.user._id, this.token).subscribe(res =>
      {
        console.log(res);
        this.orders = res;
        for(var i = 0; i< res.length; i++)
        {
          this.productsServices.getProduct(res[i].productID).subscribe(res=>{
            this.products.push(res);
            console.log(this.products);
        }) 
        
        }
        console.log("lay order thành cong");
      });
  }
  getproduct(id){
    this.productsServices.getProduct(id).subscribe(res=>{
        this.p = res;
    })  
  
  }
}
