import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { order } from '../_models';
import { ApiService } from '../shared';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  ordertid: string;
  order: order;
  constructor( 
    private route: ActivatedRoute,
    private service: ApiService
  ) { }

  ngOnInit() {
    this.ordertid = this.route.snapshot.url[1].path;
    this.service.getorderbyID(this.ordertid).subscribe(res=>{
      this.order = res;
    })
  }

}
