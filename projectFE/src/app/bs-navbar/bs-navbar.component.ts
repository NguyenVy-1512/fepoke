import { Component, OnInit, Input } from '@angular/core';
import { DataService, AlertService, ApiService } from '../shared';
import { Router, ActivatedRoute } from '@angular/router';
import { User, products } from '../_models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CookieService } from 'ngx-cookie-service'
import { Local } from 'protractor/built/driverProviders';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  searchForm: FormGroup;
  loading: boolean = false;
  token: string;
  user: User;
  name: string;
  iduser: string;
  setcard: boolean = true;
  search: string;
  insearch: boolean;
  products: products[] = [];
  product$: products[] = [];
  inadmin: boolean;
  quantity: number[] = [];
  userid: string;
  @Input() totalproduct;
  constructor( private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: ApiService,
    private alertService: AlertService,
    private cookieService: CookieService,
    private data: DataService) { }
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      search: ['', Validators.required],
  });
  
  this.search = this.f.search.value;
  this.data.currentsearch.subscribe(insearch => this.insearch =insearch);
    this.data.currentloading.subscribe(loading => this.loading = loading);
    this.token = this.data.getlocalstore('token')
    this.userid = this.data.getlocalstore('id')
    this.data.currenttoken.subscribe(token => this.token = token);
    this.data.currentuser.subscribe(user => this.user = user);
    
    // if((this.userid == '') || (this.userid == null))
    // {
    //   this.loading = false;
    // }
    // else{
    //   this.loading = true;
    //   this.userid = this.userid.slice(1, this.userid.length-1)
    //   console.log(this.userid);
    //   this.token = this.token.slice(1, this.token.length-1)
    //   console.log(this.token);
    // }
  
    console.log(this.loading);

    if (this.loading == true)
    {
      this.authenticationService.getUserByID(this.userid).subscribe((res) => {
        this.user = res;
        console.log(res);})
    }
    console.log(this.user);
    this.data.currentinadmmin.subscribe(inadmin => this.inadmin = inadmin);
    this.data.currentquantity.subscribe(quantity => this.quantity = quantity);
    for(var i = 0; i< this.quantity.length ; i++)
    {
      //this.totalproduct = this.totalproduct + this.quantity[i];
    }
    console.log(this.inadmin);
    //this.iduser = this.cookieService.get("id");
    //this.name = this.cookieService.get("name");
    //this.token = this.cookieService.get("token");
    

  }
  
  logout() {
    this.authenticationService.logout(this.token).subscribe(res => {
      this.alertService.success('Logout successful', true);
      location.reload()
      this.data.removelocalstore("token");
      this.data.removelocalstore("id");
      console.log("logout rồi nè");
    },
      error => {
        this.alertService.error(error);
      });
      this.data.changeMessage(false);
      this.data.changeToken("");
      this.data.changUser('');
      //this.data.setlocalstore("name", '');
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
