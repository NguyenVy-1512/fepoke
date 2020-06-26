import { Injectable } from '@angular/core';
import {User, products} from '../_models';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  isproduct = new BehaviorSubject<boolean>(false);
  inadmin = new BehaviorSubject<boolean>(false);
  token = new BehaviorSubject<string>("");
  loading = new BehaviorSubject<boolean>(false);
  setcard = new BehaviorSubject<boolean>(true);
  user = new BehaviorSubject<User>(null);
  p = new BehaviorSubject<products>(null);
  id = new BehaviorSubject<string>(null);
  productid = new BehaviorSubject<string>(null);
  quantity = new BehaviorSubject<number[]>([]);
  productlistcard = new BehaviorSubject<products[]>([]);
  insearch = new BehaviorSubject<boolean>(true);
  productlistsearch= new BehaviorSubject<products[]>([]);
  productlistcategory = new BehaviorSubject<products[]>([]);

  productlist= new BehaviorSubject<string[]>([]);
  currentid = this.id.asObservable();
  currentloading = this.loading.asObservable();
  currenttoken = this.token.asObservable();
  currentuser = this.user.asObservable();
  currentproduct = this.productid.asObservable();
  currentproductlist = this.productlist.asObservable();
  currentquantity = this.quantity.asObservable();
  currentp = this.p.asObservable();
  currentproductlistcard = this.productlistcard.asObservable();
  currentsetcard = this.setcard.asObservable();
  currentsearch = this.insearch.asObservable();
  currentproductlistsearch = this.productlistsearch.asObservable();
  currentinadmmin = this.inadmin.asObservable();
  currentisproduct = this.isproduct.asObservable();
  currentproductlistcategory = this.productlistcategory.asObservable();
  // có thể subcribe theo dõi thay đổi value của biến này thay cho messageSource

  constructor() { }
 
  // method này để change source message 
  changeMessage(loading) {
    this.loading.next(loading);
  }
  changeToken(token){
    this.token.next(token);
  }
  changUser(user){
    this.user.next(user);
  }
  changProduct(product){
    this.productid.next(product);
  }
  changProductlist(product){
    // this.changProduct(product);
    // this.currentproduct.subscribe(pid => this.pid = pid);
    // this.productlist.push(this.pid);
    this.productlist.next(product);
  }
  changQuantity(quantity){
    this.quantity.next(quantity);
  }
  changP(p){
    this.p.next(p);
  }
  changProductlistcard(productlistcard){
    this.productlistcard.next(productlistcard);
  }
  changsetcard(setcard){
    this.setcard.next(setcard);
  }
  changSearch(insearch){
    this.insearch.next(insearch);
  }
  changProductlistSearch(productlistsearch){
    this.productlistsearch.next(productlistsearch);
  }
  changid(id){
    this.id.next(id);
  }
  changinadmin(inadmin){
    this.inadmin.next(inadmin);
  }
  changisproduct(isproduct){
    this.isproduct.next(isproduct);
  }
  changProductlistCategory(productlistcategory){
    this.productlistcategory.next(productlistcategory);
  }
}