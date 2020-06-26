import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared';
import { products } from '../_models';


@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
 
  products: products[];
  category: string;
  totalproduct: number= 0;
 
/* i là số sản phẩm được lọc theo category */
  constructor( private productsServices: ApiService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.category = this.route.snapshot.url[1].path;
    this.productsServices.getProductByCategories(this.category).subscribe((data) => {
    this.products = data;
    console.log(this.products);
    for(var i= 0; i< this.products.length; i++)
    {
      this.totalproduct = this.totalproduct+1;
    }
    });

  }
  notifyMessage1($event) {
    this.products =[];
    this.products = $event[0];
    this.totalproduct = $event[1];
    this.category = $event[2];
    console.log(this.products);
    console.log(this.category);
    console.log(this.totalproduct);
  }

}
