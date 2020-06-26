import { Component, OnInit, Input } from '@angular/core';
import { order, products } from '../_models';
import { ApiService, DataService } from '../shared';

@Component({
  selector: 'user-order-card',
  templateUrl: './user-order-card.component.html',
  styleUrls: ['./user-order-card.component.css']
})
export class UserOrderCardComponent implements OnInit {
  @Input() order: order;
  @Input() product: products;
  token: string;
  constructor(
    private orderService: ApiService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.currenttoken.subscribe(token => this.token = token);
  }
  cancel(){
    this.data.currenttoken.subscribe(token => this.token = token);
    this.orderService.deleteOrder(this.order._id, this.token).subscribe(res =>
      {
        console.log("hủy thành công");
      })
  }
}
