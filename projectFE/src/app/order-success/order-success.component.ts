import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared';

@Component({
  selector: 'order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  orderid: string[];

  constructor(
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.currentorderid.subscribe(orderid => this.orderid = orderid);
  }

}
