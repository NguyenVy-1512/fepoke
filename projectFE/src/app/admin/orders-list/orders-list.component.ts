import { Component, OnInit } from '@angular/core';
import { ApiService, DataService } from 'src/app/shared';
import { User, order, products } from 'src/app/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'orders-list',
  templateUrl: './orders-list.component.html',
  styleUrls: ['./orders-list.component.css']
})
export class OrdersListComponent implements OnInit {
  paid: boolean;
  user: User;
  token: string;
  orders: order[];
  p: products;
  products: products[]= [];
  prductid: string;
  id: string;
  editProfileForm: FormGroup;
  constructor(
    private productsServices: ApiService,
    private data: DataService,
    private fb: FormBuilder, private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.editProfileForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: [''],
      email: ['']
     });
    this.data.currentuser.subscribe(user => this.user = user);
    this.data.currenttoken.subscribe(token => this.token = token);
    console.log(this.token);
    console.log(this.user._id);
    this.productsServices.getorder().subscribe(res =>
      {
        console.log(res);
        this.orders = res;
        for(var i = 0; i< res.length; i++)
        {
          this.productsServices.getProduct(this.orders[i].productid).subscribe(res=>{
            this.p = res;
            this.products.push(this.p);
        }) 
        }
        console.log(this.products);
        console.log("lay order thành cong");
      });
  }
  getproduct(id){
    this.productsServices.getProduct(id).subscribe(res=>{
        this.p = res;
    })  
  }
  // cancel(id){
  //   this.data.currenttoken.subscribe(token => this.token = token);
  //   this.productsServices.deleteOrder(id).subscribe(res =>
  //     {
  //       console.log("hủy thành công");
  //     })
  // }
 
  openModal(targetModal, user) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    this.paid = user.paid;
    this.id = user._id
    this.editProfileForm.patchValue({
      firstname: user._id,
      username: user.userid,
      email: user.total
     });
  }
  get f() { return this.editProfileForm.controls; }
    onSubmit() {
     this.modalService.dismissAll();
     console.log("res:", this.editProfileForm.getRawValue());
    }
    cancel(){
      this.data.currenttoken.subscribe(token => this.token = token);
      this.productsServices.deleteOrder(this.id).subscribe(res =>
        {
          console.log("hủy thành công");
        })
      }
     confirm(){
      this.productsServices.confirmorder(this.id).subscribe(res =>
        {
        console.log(" thành công");
        
        })
  }
}
