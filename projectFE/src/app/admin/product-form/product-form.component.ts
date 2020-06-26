import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, ApiService, DataService } from 'src/app/shared';
import { products, category } from 'src/app/_models';

@Component({
  selector: 'product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  addproductForm: FormGroup;
  product= new products();
  categorys:category[]= [];
  category= new category('1457hchtyy6ghc','');
  id: string;
  productid: string;
  isproduct: boolean;
  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private prductsService: ApiService,
    private data:DataService) { }


  ngOnInit() {
    this.addproductForm = this.formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required],
      category1: ['', Validators.required],
      desc: ['', Validators.required],
      image: ['', Validators.required],
  });
  this.data.currentisproduct.subscribe(isproduct => this.isproduct = isproduct);
  this.productid = this.route.snapshot.url[2].path;
  console.log(this.productid);
  if(this.productid !== "new"){
  this.prductsService.getProduct(this.productid).subscribe((data)=>{this.product = data;
    console.log(this.product);

    });
  }
  console.log(this.isproduct);
  }
  get f() { return this.addproductForm.controls; }

  onadd(){

    this.prductsService.addProduct(this.f.name.value, this.f.desc.value, this.f.price.value, 5, 8, this.f.image.value, this.categorys)
          .subscribe(
              res => {console.log('them san pham thanh cong');
            this.router.navigate(['/admin/products']);
            });
  }
  onchange(){
    this.productid = this.route.snapshot.url[2].path;
    this.prductsService.updateProduct(this.productid,this.f.desc.value).subscribe(
      res => {console.log('sửa thành công');
      this.router.navigate(['/admin/products']);
    });
  }
  ondelete(){
    this.productid = this.route.snapshot.url[2].path;
    this.prductsService.deleteProduct(this.productid).subscribe(
      res => {console.log('xóa thành công');
      this.router.navigate(['/admin/products']);
    });
  }
}
