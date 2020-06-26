import { Component, OnInit } from '@angular/core';
import { products } from 'src/app/_models';
import { ApiService, DataService } from 'src/app/shared';
import { Router } from '@angular/router';

@Component({
  selector: 'admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: products[];
  searchText;
    constructor(private productsServices: ApiService,
      private data: DataService,
      private router: Router) {}
  
  ngOnInit() {
    this.productsServices.getProducts().subscribe((data) => {
      console.log(data);
      this.products = data;
      console.log(this.products);
    });
  }
  onisproduct(){
    this.data.changisproduct(true);
  }
  delete(){
    var product;
    var productid = document.getElementById("value");
    var productid1 = productid.innerText;
    console.log(productid1);
    this.productsServices.getProduct(productid1).subscribe(data =>{
      product = data
      this.products = this.products.filter(h => h !== product);
    })
    console.log(product);
    console.log(this.products)
    //  this.productsServices.deleteProduct(productid1).subscribe(res =>
    //    {
    //      console.log('dã xóa sp '+ product._id);
    //  })
    
  }
}
