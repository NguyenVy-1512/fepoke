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
  orders: order[] = [];
  products: products[] = [];
  p : products;
  constructor(private router: Router,
    private productsServices: ApiService,
    private data: DataService) { }

  ngOnInit() {
    this.data.currentuser.subscribe(user => this.user = user);
    console.log(this.user._id);
    this.productsServices.getorderbyuser(this.user._id).subscribe(res =>
      {
        console.log(res);
        this.orders = res;
        for(var i = 0; i< res.length; i++)
        {
          this.productsServices.getProduct(this.orders[i].productid).subscribe(res=>{
            this.products.push(res);
        }) 
        console.log(this.products);
        }
        console.log("lay order thành cong");
      });
  }
}
