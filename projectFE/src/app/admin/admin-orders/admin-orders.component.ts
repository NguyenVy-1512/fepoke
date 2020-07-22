import { Component, OnInit } from '@angular/core';
import { order } from 'src/app/_models';
import { ApiService } from 'src/app/shared';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent implements OnInit {
  orders: order[];
  constructor(
    private Service: ApiService
  ) { }

  ngOnInit() {
    this.Service.getorder().subscribe(res =>{
      this.orders = res;
    })
  }

}
