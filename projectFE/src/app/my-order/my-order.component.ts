import { Component, OnInit, Output } from '@angular/core';
import { ApiService, DataService } from '../shared';
import { order, User, products } from '../_models';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
  user: User;
  token: string;
  orders: order[] = [];
  products: (products[])[] = [];
  product: products[] = [];
  p : products;
  orderid: string;
  order: order;
  constructor(private router: Router,
    private productsServices: ApiService,
    private data: DataService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.data.currentuser.subscribe(user => this.user = user);
    console.log(this.user._id);
    this.productsServices.getorderbyuser(this.user._id).subscribe(res =>
      {
        console.log(res);
        this.orders = res;
        console.log("lay order thành cong");
      });
  }
  getValue(event:any) {
    this.orderid = event.target.innerText;
    console.log("value", this.orderid);
  }
  openModal(targetModal, user) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static'
     });
    this.order = user;
  }
}
