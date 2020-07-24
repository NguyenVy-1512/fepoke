import { Component, OnInit, Input } from '@angular/core';
import { order, products, User } from '../_models';
import { ApiService, DataService } from '../shared';

@Component({
  selector: 'user-order-card',
  templateUrl: './user-order-card.component.html',
  styleUrls: ['./user-order-card.component.css']
})
export class UserOrderCardComponent implements OnInit {
  @Input()order: order;
  @Input() product: products;
  @Input() orderid: string;
  orders: order[];
  user: User;
  constructor(
    private orderService: ApiService,
    private data: DataService
  ) { }

  ngOnInit() {
   
   //this.data.currentuser.subscribe(user => this.user = user);
    // console.log(this.orderid);
    // this.orderService.getorderbyID(this.orderid).subscribe(res =>
    //   {
    //     console.log(res);
    //    // this.orders = res;
    //    this.order = res;
    //    console.log(this.order);
    //     console.log("lay order thành cong");
    //   });
     
  }
  cancel(){
    
    this.orderService.deleteOrder(this.order._id).subscribe(res =>
      {
        console.log("hủy thành công");
      })
  }
}
