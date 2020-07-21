import { Component, OnInit } from '@angular/core';
import { DataService, ApiService } from '../shared';

@Component({
  selector: 'order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {

  orderid: string;

  constructor(
    private data: DataService,
    private sevice: ApiService
  ) { }

  ngOnInit() {
    this.data.currentorderid.subscribe(orderid => this.orderid = orderid);
    console.log(this.orderid)
  }

  cancel(){
    this.sevice.deleteOrder(this.orderid).subscribe(res => {
      console.log('sorry')
    })
  }

}
