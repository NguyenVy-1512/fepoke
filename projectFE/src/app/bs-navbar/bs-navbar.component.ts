import { Component, OnInit, Input } from '@angular/core';
import { DataService, AlertService, ApiService } from '../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { User, products } from '../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  searchForm: FormGroup;
  loading: boolean = true;
  token: string;
  user: User;
  setcard: boolean = true;
  search: string;
  insearch: boolean;
  products: products[] = [];
  product$: products[] = [];
  inadmin: boolean;
  quantity: number[] = [];
  totalproduct: number =0;
  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: ApiService,
    private alertService: AlertService,
    private data: DataService) { }
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
  });

  this.search = this.f.search.value;
  this.data.currentsearch.subscribe(insearch => this.insearch =insearch);
    this.data.currentloading.subscribe(loading => this.loading = loading);
    this.data.currenttoken.subscribe(token => this.token = token);
    this.data.currentuser.subscribe(user => this.user = user);
    this.data.currentinadmmin.subscribe(inadmin => this.inadmin = inadmin);
    this.data.currentquantity.subscribe(quantity => this.quantity = quantity);
    for(var i = 0; i< this.quantity.length ; i++)
    {
      this.totalproduct = this.totalproduct + this.quantity[i];
    }
    console.log(this.inadmin);
  }
  
  logout() {
    this.authenticationService.logout(this.token).subscribe(res => {
      this.alertService.success('Logout successful', true);
      this.router.navigate(['/login']);
      console.log("logout rồi nè");
    },
      error => {
        this.alertService.error(error);
      });
      this.data.changeMessage(false);
      this.data.changeToken("");
      this.data.changUser('');
  }

  onsetcard(){
    this.setcard = false;
    this.data.changsetcard(this.setcard);
  }
  get f() { return this.searchForm.controls; }

  onsearch(){
    this.search = this.f.search.value;
    // kiếm product theo tên
    this.authenticationService.getProducts().subscribe((data) => {
      this.products = data;
      this.product$ = [];
      if(this.search == '')
      {
        this.product$ = this.products;
        this.search = 'product'
        this.router.navigate(['/search/'+ this.search]);
      }
      else{
      for (var i = 0; i < this.products.length; i++) {
          var string = this.products[i].name.toLowerCase();
        if (string.indexOf(this.search) > -1) {
        
            this.product$.push(this.products[i]);
        }
      }
    }
      console.log(this.product$);
      this.data.changProductlistSearch(this.product$);
    });
     
    
    this.router.navigate(['/search/'+ this.search]);
  }
}
