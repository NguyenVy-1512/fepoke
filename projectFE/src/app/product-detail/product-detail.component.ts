import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService, DataService } from '../shared';
import { products, category, rating } from '../_models';

@Component({
  selector: 'product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  loading: boolean;
  id: number;
  totalproduct: number = 0;
  total: number = 0;
  productid: string;
  counter: number = 1;
  couterlist: number[];
  productlist: string[];
  productlistcard: products[] = [];
  products: products[] = [];
  product$: products[] = [];
  @Output() p: products;
  cate: string[];
  quantity: number[];
  flag: boolean = false;
  setcard: boolean;
  category: category[] = [];
  checkrating: boolean = false;
  comment: rating[];
  @Output() rate = new EventEmitter<number>();
  constructor(private route: ActivatedRoute,
              private router: Router,
              private productService: ApiService,
              private data: DataService) {
  }

  ngOnInit() {
    this.category = [];
    this.data.currentloading.subscribe(loading => this.loading = loading);
    this.data.currentproductlistcard.subscribe(productlistcard => this.productlistcard = productlistcard);
    this.data.currentproductlist.subscribe(productlist => this.productlist = productlist);
    console.log(this.productlist);
    this.data.currentquantity.subscribe(quantity => this.quantity = quantity);
    //lấy id product là gọi api để lấy product
    this.productid = this.route.snapshot.url[1].path;
    console.log(this.productid);
    // lấy thông tin product
    this.productService.getProduct(this.productid).subscribe((data)=>{this.p = data;
      if(data.view == 0)
      {
        this.checkrating = true;
      }
      this.rate = data.view;
      console.log(this.p);
      //lấy tên categorys
     for(var i=0; i < data.category.length; i++)
     {
       this.productService.getCategory(data.category[i]).subscribe((res)=>{
         this.category.push(res);
       })
     }
     })
   
    //this.data.currentp.subscribe(p => this.p = p)
    console.log(this.category)

    //this.productid = this.route.snapshot.url[1].path;
    //this.getProduct(this.productid);
    // lấy số lượng sản phẩm, nếu đã có trong giỏ hàng thì lấy số đó, nếu chưa có set về 1
    if(this.quantity[this.productlist.indexOf(this.productid)] != undefined)
    {
      this.counter = this.quantity[this.productlist.indexOf(this.productid)];
    }
    // lấy list product có giá nhỏ hơn hoặc bằng giá hiện tại
    this.productService.getProducts().subscribe((data) => {
      this.products = data;
      this.product$ = data;
      var k = 0;
      for(var l = 0; l< this.product$.length; l++)
      {
        if( this.product$[l].price >= this.p.price){
          this.products[k] = this.product$[l];
          k++;
        }
      }
      if(this.products.length > 8){
      this.products.splice(8, this.product$.length - 8);
      }
      });

    console.log(this.quantity[this.productlist.indexOf(this.productid)]);
    console.log(this.counter);
    console.log(this.productid);
    // list comment
    this.productService.getratingbyproduct(this.productid).subscribe(res => {
      this.comment = res;
      console.log(res);
    })

  }

  getProduct(id: string) {
    this.productService.getProduct(id).subscribe((data)=>{this.p = data;
       //lấy tên categorys
      for(var i=0; i < data.category.length; i++)
      {
        this.productService.getCategory(data.category[i]).subscribe((res)=>{
          this.category.push(res);
        })
      }
      console.log(this.p);
      })
  }

  addtocard(){
    this.setcard = false;
    this.data.changsetcard(this.setcard);
    //lấy list giỏ hàng hiện tại
    this.data.currentproductlistcard.subscribe(productlistcard => this.productlistcard = productlistcard);
    this.data.currentproductlist.subscribe(productlist => this.productlist = productlist);
    console.log(this.productlist);
    this.data.currentquantity.subscribe(quantity => this.quantity = quantity);
    this.productid = this.route.snapshot.url[1].path;
    console.log(this.productid);
    this.getProduct(this.productid);
    // thêm vào giỏ hàng nếu chưa có, hoặc thay đổi số lượng khi có r
    if (this.productlist.indexOf(this.productid) == -1) {
      if (this.productlist[0] == null) {
        this.productlist[0] = this.productid;
        this.id = 0;
      }
      else {
        this.productlist.push(this.productid);
        this.id = this.productlist.indexOf(this.productid);
      }

      if (this.productlistcard[0] == null) {
        this.productlistcard[0] = this.p;
      }
      else {
        this.productlistcard.push(this.p);
      }
      this.data.changProductlist(this.productlist);

    }
    else {
      this.id = this.productlist.indexOf(this.productid);
    }
      this.quantity[this.id] = this.counter;
      this.data.changQuantity(this.quantity);
    this.router.navigate([`/shopping-cart`]);
  }
  notifyMessage($event) {
    this.counter = this.counter + 1;
  }
  notifyMessage1($event) {
    this.counter = this.counter -1;
  }
  notifyMessage2($event) {
    this.rate = $event;
  }

  valueChanged1($event) {
    this.productid = this.route.snapshot.url[1].path;
    this.productService.getProduct(this.productid).subscribe((data)=>{this.p = data;
      if(data.view == 0)
      {
        this.checkrating = true;
      }
      this.rate = data.view;
      console.log(this.p);
    })
  }
}
