import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, ApiService, DataService } from '../shared';
import { User, products, order } from '../_models';
//import { StripeService, Element as StripeElement } from 'ngx-stripe'

@Component({
  selector: '/check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit {
  //elements: StripeElement;
  //card: StripeElement;
  stripeFromGrp: FormGroup;

  CheckOut: FormGroup;
  id: string;
  user: User;
  token: string;
  productid: string;
  counter: number = 0;
  couterlist: number[];
  productlist: string[];
  productlistcard: products[] = [];
  product: products;
  quantity: number[];
  Total: number = 0;
  totalproduct: number = 0;
  price: number;
  order: order;
  loading: boolean;
  paymethod: string = "";
  orderid: string;
  phone: string;
  address: string;
  email: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private data: DataService,
    private productsServices: ApiService,
    //private stripeService: StripeService
    ) { }
  ngOnInit() {
    this.CheckOut = this.formBuilder.group({
           name: ['', [Validators.required]],
           phone: ['', [Validators.required]],
           address: ['', [Validators.required]],

       });
    // this.stripeFromGrp = this.formBuilder.group({
    //   name: ['', [Validators.required]]
    // });

    // this.stripeService.elements().subscribe(elements => {
    //   this.elements = elements;
    //   if (!this.card) {
    //     this.card = this.elements.create('card', {
    //       style: {
    //         base: {
    //           iconColor: '#666EE8',
    //           color: '#31325F',
    //           lineHeight: '40px',
    //           fontWeight: 300,
    //           fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
    //           fontSize: '18px',
    //           '::placeholder': {
    //             color: '#CFD7E0'
    //           }
    //         }
    //       }
    //     });
    //     this.card.mount('#card-element');
    //   }
    // })

    //this.id = this.route.snapshot.params.iduser;
    this.data.currenttoken.subscribe(token => this.token = token);
    this.data.currentuser.subscribe(user => this.user = user);
    //this.data.currentproductlist.subscribe(productlist => this.productlist = productlist);
    this.data.currentquantity.subscribe(quantity => this.quantity = quantity);
    this.data.currentproductlistcard.subscribe(productlistcard => this.productlistcard = productlistcard);
    this.data.currentloading.subscribe(loading => this.loading = loading);
    this.CheckOut = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required]
    });

    for (var i = 0; i < this.quantity.length; i++) {
      this.totalproduct = this.totalproduct + this.quantity[i];
      this.Total = (this.productlistcard[i].price * this.quantity[i]) + this.Total;
    }
    console.log(this.totalproduct);
  }
  get f() { return this.CheckOut.controls; }

  // onPaymentMethodChange(entry) {
  //   console.log("entry: ", entry)
  //   if (entry == 1) {
  //     this.paymethod = "CREDIT"
  //   } else if (entry == 2) {
  //     this.paymethod = "COD"
  //   }
  // }

  addorder() {
    this.data.currentuser.subscribe(user => this.user = user);
    this.data.currentproductlist.subscribe(productlist => this.productlist = productlist);
    this.data.currentquantity.subscribe(quantity => this.quantity = quantity);
    console.log(this.productlist)
    console.log(this.f.phone.value)
    console.log(this.user._id)
    console.log(this.quantity)
    //this.productsServices.payment(this.token, '', this.Total, this.CheckOut.get('phone').value, this.CheckOut.get('address').value, this.paymethod);

    //for (var i = 0; i < this.productlist.length; i++) {
      if(this.f.phone.value == '')
      {
        this.phone = this.user.phone;
      }
      else{
        this.phone = this.f.phone.value;
      }
      if(this.f.address.value == '')
      {
        this.address = this.user.address;
      }
      else{
        this.address = this.user.address;
      }
      if(this.f.name.value == '')
      {
        this.email = this.user.email;
      }
      else{
        this.email = this.f.name.value;
      }
      console.log(this.phone)

        this.productsServices.addorder(this.productlist, this.user._id, this.quantity, this.phone, this.address, this.email).subscribe(
          res => { console.log('order thành công');
          this.orderid = res._id;
          this.data.changeorderid(this.orderid);
        }); 
    //}
    this.data.changProductlistcard([]);
    this.data.changQuantity([]);
    this.data.changProductlist([]);
    this.router.navigate(['/order-success']);
  }

  // buy() {
  //   const name = this.stripeFromGrp.get('name').value;
  //   this.stripeService.createToken(this.card, { name }).subscribe(result => {
  //     // if (result.token) {
  //     //   // https://stripe.com/docs/charges
  //     //   console.log('token id: ', result.token.id);
  //     //   this.productsServices.payment(this.token, result.token.id, this.Total, this.CheckOut.get('phone').value, this.CheckOut.get('address').value, this.paymethod)
  //     //   .subscribe()

  //     // } else if (result.error) {
  //     //   console.log("MErr: ", result.error.message)
  //     // }
  //   })
  //   this.router.navigate(['/order-success'])

  // }
}