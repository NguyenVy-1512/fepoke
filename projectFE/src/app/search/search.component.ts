import { Component, OnInit } from '@angular/core';
import { DataService, AlertService, ApiService } from '../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { products } from '../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Options, LabelType } from 'ng5-slider';
import { element } from 'protractor';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm: FormGroup;
  products: products[];
  product$: products[] = [];
  search: string;
  insearch = false;
  productlistsearch: products[];
  range : number = 1800;
  range1: number = 1800;
 
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private productsServices: ApiService,
    private alertService: AlertService,
    private data: DataService) { }
    
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
  });
  
  
  // lấy list tất cả product băng api product,
    this.data.currentproductlistsearch.subscribe(productlistsearch =>this.productlistsearch = productlistsearch);
    // this.productsServices.getProducts().subscribe((data) => {
    //   this.products = data;
    //   // lấy chuỗi tìm kiếm từ url
    this.search = this.route.snapshot.url[1].path;
    //   // tìm trong list product có tên chữa chuỗi 
    //   for (var i = 0; i < this.products.length; i++) {
    //       var string = this.products[i].name.toLowerCase();
    //     if (string.indexOf(this.search) > -1) {
    //     // nếu có thì push vào mảng product$ ok ban
    //         this.product$.push(this.products[i]);
    //     }
    //   }
    //   console.log(this.product$);
    // });
    console.log(this.productlistsearch);
  }
  get f() { return this.searchForm.controls; }
  onsearch(){
    console.log("search");
    //dưới này tương tự, chỉ là bạn reset cáu mảng kết quả về 0 rồi lấy lại
    // hàm này dùng cho search nhỏ ở trong trang, thì ok,ok hieu
    this.search = this.f.search.value;
    this.productsServices.getProducts().subscribe((data) => {
      this.products = data;
      this.productlistsearch = [];
      this.search = this.route.snapshot.url[1].path;
      console.log(this.search);
      if(this.search == '')
      {
        this.productlistsearch = this.products;
        this.search = 'product'
        
      }
      else{
      for (var i = 0; i < this.products.length; i++) {
          var string = this.products[i].name.toLowerCase();
        if (string.indexOf(this.search) > -1) {
        
            this.productlistsearch.push(this.products[i]);
        }
      }
    }
      console.log(this.productlistsearch);
    });
    this.router.navigate(['/search/'+ this.search]);
  }
  valueChanged(e) {
    this.range = e;
    this.productsServices.getProducts().subscribe((data) => {
      this.products = data;
      this.productlistsearch = [];
      this.search = this.route.snapshot.url[1].path;
      if(this.search == 'product'){
      for (var i = 0; i < this.products.length; i++) {
      if ( this.products[i].price <= this.range && this.products[i].price >= this.range1) {
      
          this.productlistsearch.push(this.products[i]);
      }
    }
      }
    else{
      for (var i = 0; i < this.products.length; i++) {
          var string = this.products[i].name.toLowerCase();
        if (string.indexOf(this.search) > -1 && this.products[i].price <= this.range && this.products[i].price >= this.range1) {
        
            this.productlistsearch.push(this.products[i]);
        }
      }
    }
      console.log(this.productlistsearch);
    });
    this.router.navigate(['/search/'+ this.search]);
    console.log('e', e);
}
valueChanged1(e){
  this.productsServices.getProducts().subscribe((data) => {
    this.products = data;
    this.productlistsearch = [];
    this.search = this.route.snapshot.url[1].path;
    if(this.search == 'product'){
    for (var i = 0; i < this.products.length; i++) {
    if ( this.products[i].price <= this.range && this.products[i].price >= this.range1) {
    
        this.productlistsearch.push(this.products[i]);
    }
  }
}
  else{
    for (var i = 0; i < this.products.length; i++) {
        var string = this.products[i].name.toLowerCase();
      if (string.indexOf(this.search) > -1 && this.products[i].price <= this.range && this.products[i].price >= this.range1) {
      
          this.productlistsearch.push(this.products[i]);
      }
    }
  }
    console.log(this.productlistsearch);
  });
  this.router.navigate(['/search/'+ this.search]);
this.range1= e; 
}

}
