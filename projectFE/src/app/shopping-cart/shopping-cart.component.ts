import { Component, OnInit } from '@angular/core';
import { ApiService, DataService } from '../shared';
import { products, User } from '../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  productid: string;
  counter: number = 0;
  couterlist: number[];
  productlist: string[];
  productlistcard: products[] = [];
  product: products;
  p: products;
  quantity: number[];
  total: number = 0;
  totalproduct: number = 0;
  price: number = 0;
  flag: boolean = true;
  setcard: boolean;
  user: User;
  loading: boolean;
  constructor(
    private data: DataService,
    private router: Router) { }

  ngOnInit() {
    this.data.currentuser.subscribe(user => this.user = user);
    this.data.currentsetcard.subscribe(setcard => this.setcard = setcard);
    this.data.currentproductlistcard.subscribe(productlistcard => this.productlistcard = productlistcard);
    this.data.currentproductlist.subscribe(productlist => this.productlist = productlist);
    console.log(this.productlist);
    this.data.currentproduct.subscribe(productid => this.productid = productid);
    this.data.currentquantity.subscribe(quantity => this.quantity = quantity);
    this.data.currentp.subscribe(p => this.p = p);
    console.log(this.productid);
    console.log(this.quantity);
    // thêm product chọn vào danh sách sản phầm gior hàng và thêm số lượng tương ứng
    if (this.setcard == true) {
      if (this.productlist.indexOf(this.productid) == -1) {
        if (this.productlist[0] == null) {
          this.productlist[0] = this.productid;
        }
        else {
          this.productlist.push(this.productid);
        }
        if (this.productlistcard[0] == null) {
          this.productlistcard[0] = this.p;
        }
        else {
          this.productlistcard.push(this.p);
        }
        this.counter = this.counter + 1;
        this.data.changProductlist(this.productlist);
        this.data.currentproductlist.subscribe(productlist => this.productlist = productlist);
        var i = this.productlist.indexOf(this.productid);
        this.quantity[i] = this.counter;
        this.data.changQuantity(this.quantity);
      }
      else {
        this.counter = this.counter + 1;
        var i = this.productlist.indexOf(this.productid);
        this.quantity[i] = this.quantity[i] + 1;
        this.data.changQuantity(this.quantity);
      }
      // lấy lại giá trị của giỏ hàng
      this.data.currentquantity.subscribe(quantity => this.quantity = quantity);
      console.log(this.quantity);
      this.data.changProductlist(this.productlist);
      this.data.currentproductlist.subscribe(productlist => this.productlist = productlist);
      //console.log(this.productlist);

      console.log(this.productlist);
      this.data.changProductlistcard(this.productlistcard);
      console.log(this.productlistcard);
    }
    //tính tổng tiền và tổng sản phẩm trong giỏ hàng
    this.data.currentproductlistcard.subscribe(productlistcard => this.productlistcard = productlistcard);
    for (var i = 0; i < this.quantity.length; i++) {
      this.totalproduct = this.totalproduct + this.quantity[i];
      this.total = this.total + (this.productlistcard[i].price * this.quantity[i]);
    }
    // this.getProduct(this.productlistfake[i])
    // this.products.push(this.product);
    this.setcard = true;
    this.data.changsetcard(this.setcard);
    console.log(this.totalproduct);
    console.log(this.total);
  }
  ckeckout(){
    this.data.currentloading.subscribe(loading => this.loading = loading);
    if (this.loading !== false) {
      this.router.navigate(["/check-out"])
    }
    else {
      this.router.navigate(['/login']);
    }

  }

  deleteproduct(){
    
  }
  notifyMessage($event) {
    this.totalproduct = this.totalproduct + 1;
    this.total = this.total + this.productlistcard[$event].price;
  }
  notifyMessage1($event) {
    this.totalproduct = this.totalproduct - 1;
    this.total = this.total - this.productlistcard[$event].price;
  }
}
