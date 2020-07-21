import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared';
import { products, category } from '../_models';


@Component({
  selector: 'category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
 
  products: products[] = [];
  category: category;
  name: string
  cate: string[];
  totalproduct: number= 0;
 
/* i là số sản phẩm được lọc theo category */
  constructor( private productsServices: ApiService,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit() {
    this.products = []
    this.name = this.route.snapshot.url[1].path;
    this.productsServices.getProductByCategories(this.name).subscribe((data) => {
      console.log(data);
    this.category = data;
    for(var i=0; i< data.products.length; i++)
    {
      this.totalproduct = this.totalproduct+1;
    this.productsServices.getProduct(data.products[i]).subscribe((res)=>{
    this.products.push(res);
    })
    }

    });

  }
  notifyMessage1($event) {
    this.products =[];
    this.products = $event[0];
    this.totalproduct = $event[1];
    this.category.name = $event[2];
    console.log(this.products);
    console.log(this.category);
    console.log(this.totalproduct);
  }

}
