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


  constructor( private data: DataService, 
    private Service: ApiService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit() {
    this.rateForm = this.formBuilder.group({
      content: ['', Validators.required],
  });
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
          })
        }
      }
      if(checkrate == false)
      {
      this.Service.addrate(this.user._id, this.p, this.rate, this.f.content.value).subscribe(res=>{
        console.log('thanh cong');
        this.check = true;
      })
    }
    })
    console.log(this.user._id);
    console.log(this.p);
    console.log(this.rate);
    console.log(this.f.content.value);
    
  }
  get f() { return this.rateForm.controls; }
  reset(){
    this.ctrl.setValue(null);
    this.rateForm.reset();
  }
  change(){
    this.productid = this.route.snapshot.url[1].path;
    this.Service.getProduct(this.p).subscribe(res=>{
      this.rate = res.view
      this.valueChange.emit(this.rate);
      })
      
  }
}