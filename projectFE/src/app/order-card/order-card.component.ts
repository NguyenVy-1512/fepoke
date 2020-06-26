import { Component, OnInit, Input } from '@angular/core';
import { order, products } from '../_models';
import { ApiService, DataService } from '../shared';

@Component({
  selector: 'order-card',
  templateUrl: './order-card.component.html',
  styleUrls: ['./order-card.component.css']
})
export class OrderCardComponent implements OnInit {
  @Input() order: order;
  @Input() product: products;
  token: string;
  constructor(private orderService: ApiService,
    private data: DataService) { }

  ngOnInit() {
    console.log(this.order);
  }
  cancel(){
    this.data.currenttoken.subscribe(token => this.token = token);
    this.orderService.deleteOrder(this.order._id, this.token).subscribe(res =>
      {
        console.log("hủy thành công");
      })
  }
}
