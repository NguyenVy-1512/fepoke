import { Component, OnInit } from '@angular/core';
import { ApiService, DataService } from 'src/app/shared';
import { User, order, products } from 'src/app/_models';

@Component({
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {

  user: User;
  token: string;
  orders: order[];
  p: products;
  products: products[]= [];
  prductid: string;
  constructor(
    private productsServices: ApiService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.currentuser.subscribe(user => this.user = user);
    this.data.currenttoken.subscribe(token => this.token = token);
    console.log(this.token);
    console.log(this.user._id);
    this.productsServices.getorder().subscribe(res =>
      {
        console.log(res);
        this.orders = res;
        for(var i = 0; i< res.length; i++)
        {
          this.productsServices.getProduct(this.orders[i].productID).subscribe(res=>{
            this.p = res;
            this.products.push(this.p);
        }) 
        }
        console.log(this.products);
        console.log("lay order thành cong");
      });
  }
  getproduct(id){
    this.productsServices.getProduct(id).subscribe(res=>{
        this.p = res;
    })  
  }
  cancel(){
    this.data.currenttoken.subscribe(token => this.token = token);
    this.productsServices.deleteOrder(this.prductid, this.token).subscribe(res =>
      {
        console.log("hủy thành công");
      })
  }
}
