import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { User, products, rating } from '../_models';
import { AlertService, ApiService, DataService } from '../shared';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  styles: [`
.star {
font-size: 30px;
color: #ebebeb;
}
.filled {
color: #FFD656;
}
`]
})
export class RatingComponent implements OnInit {
  @Output() valueChange = new EventEmitter<number>();
  rate:number;
  check: boolean = false;
  token:string;
  user: User;
  content: string;
  @Input() p: string;
  r: rating;
  rateForm: FormGroup;
  ctrl = new FormControl(null, Validators.required);
  productid: string;
  a: any[] = [];
  @Output() valueChange1 = new EventEmitter<any[]>();


  constructor( private data: DataService, 
    private Service: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.rateForm = this.formBuilder.group({
      content: ['', Validators.required],
  });
    this.check = false;
    this.rate = this.ctrl.value;
    this.data.currentuser.subscribe(user=> this.user = user);
    this.data.currenttoken.subscribe(token => this.token = token);
    console.log(this.user._id);
    this.Service.getratingbyuser(this.user._id).subscribe(res=>{
      for(var i = 0; i < res.length; i++)
      {
        if(res[i].productID == this.p)
        {
          this.Service.getProduct(this.p).subscribe(res=>{
          this.rate = res.view
          })
          this.content = res[i].content;
        }
      }
    })
  }
  toggle() {
    this.rate = this.ctrl.value;
    var checkrate = false;
    this.Service.getratingbyuser(this.user._id).subscribe(res=>{
      for(var i = 0; i < res.length; i++)
      {
        if(res[i].productID == this.p)
        {
          checkrate = true;
          this.Service.updateratingbyuser(res[i]._id, this.rate, this.f.content.value).subscribe(res =>{
            this.check = true;
            this.a[1] = res._id;
          })
        }
      }
      if(checkrate == false)
      {
        checkrate = true;
      this.Service.addrate(this.user._id, this.p, this.rate, this.f.content.value).subscribe(res=>{
        console.log('thanh cong');
        this.a[1] = res._id;
        this.check = true;
      })
    }
    })
    console.log(this.user._id);
    console.log(this.p);
    console.log(this.rate);
    console.log(this.f.content.value);
    this.productid = this.route.snapshot.url[1].path;
    this.Service.getProduct(this.productid).subscribe(res=>{
      this.a[0] = res.view
      this.valueChange1.emit(this.a);
      })
  }
  get f() { return this.rateForm.controls; }
  reset(){
    this.ctrl.setValue(null);
    this.rateForm.reset();
  }
 
}