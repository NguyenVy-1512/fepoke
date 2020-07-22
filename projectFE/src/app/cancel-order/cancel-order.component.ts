import { Component, OnInit } from '@angular/core';
import { DataService, ApiService } from '../shared';

@Component({
  selector: 'cancel-order',
  templateUrl: './cancel-order.component.html',
  styleUrls: ['./cancel-order.component.css']
})
export class CancelOrderComponent implements OnInit {
  orderid: string;
  constructor(private data: DataService,
    private service: ApiService) { }

  ngOnInit() {

  }
  

}
