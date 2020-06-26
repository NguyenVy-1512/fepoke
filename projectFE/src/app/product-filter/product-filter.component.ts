import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { products } from '../_models';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService ,DataService} from '../shared';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  products: products[] = [];
  totalproduct: number =0;
  name: string;
  a =[];
  @Output() valueChange1 = new EventEmitter<any[]>();
  constructor(private productsServices: ApiService,
    private route: ActivatedRoute,
    private router: Router,
    private data: DataService) { }

  ngOnInit() {
  }
  onClick(){
    this.totalproduct = 0;
    this.productsServices.getProducts().subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "All-Types"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
    
    this.router.navigate(["/category/All-Types"]);
  }
  onClick1(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Normal").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Normal"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
    
    this.router.navigate(["/category/Normal"]);
  }
  onClick2(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Fire").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Fire"
      console.log(this.a);
      this.valueChange1.emit(this.a);
      });
   
    this.router.navigate(["/category/Fire"]);
  }
  onClick3(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Water").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Water"
      this.valueChange1.emit(this.a);
      console.log(this.products);
      });
   
    this.router.navigate(["/category/Water"]);
  }
  onClick4(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Grass").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Grass"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
   
    this.router.navigate(["/category/Grass"]);
  }
  onClick5(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Electric").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Electric"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
   
    this.router.navigate(["/category/Electric"]);
  }
  onClick6(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Ice").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Ice"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
   
    this.router.navigate(["/category/Ice"]);
  }
  onClick7(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Fighting").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Fighting"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
    
    this.router.navigate(["/category/Fighting"]);
  }
  onClick8(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Poison").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Poison"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
    
    this.router.navigate(["/category/Poison"]);
  }
  onClick9(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Ground").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Ground"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
    
    this.router.navigate(["/category/Ground"]);
  }
  onClick10(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Flying").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Flying"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
    
    this.router.navigate(["/category/Flying"]);
  }
  onClick11(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Psychic").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Psychic"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
    
    this.router.navigate(["/category/Psychic"]);
  }
  onClick12(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Bug").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Bug"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
   
    this.router.navigate(["/category/Bug"]);
  }
  onClick13(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Rock").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Rock"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
    
    this.router.navigate(["/category/Rock"]);
  }
  onClick14(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Ghost").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Ghost"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
    
    this.router.navigate(["/category/Ghost"]);
  }
  onClick15(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Dragon").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Dragon"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
    
    this.router.navigate(["/category/Dragon"]);
  }
  onClick16(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Dark").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Dark"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
    
    this.router.navigate(["/category/Dark"]);
  }
  onClick17(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Steel").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Steel"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
   
    this.router.navigate(["/category/Steel"]);
  }
  onClick18(){
    this.totalproduct = 0;
    this.productsServices.getProductByCategories("Fariry").subscribe((data) => {
      this.products = data;
      this.a[0] = this.products;
      for(var i = 0; i< data.length; i++)
      {
        this.totalproduct = this.totalproduct +1;
      }
      this.a[1] = this.totalproduct;
      this.a[2] = "Fariry"
      console.log(this.products);
      this.valueChange1.emit(this.a);
      });
    
    this.router.navigate(["/category/Fariry"]);
  }
}
