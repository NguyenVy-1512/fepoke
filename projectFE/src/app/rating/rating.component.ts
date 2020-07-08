import { Component, OnInit, Input } from '@angular/core';
import {FormBuilder,FormGroup, FormControl, Validators} from '@angular/forms';
import { User } from '../_models';
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
  rate:number;
  token:string;
  @Input() productID: string;
  user: User;
  content: string;
  productid:string;
  rateForm: FormGroup;
  ctrl = new FormControl(null, Validators.required);


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
    this.productid = this.route.snapshot.url[1].path;
    console.log(this.user._id);
  }
  toggle() {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      this.ctrl.disable();
    }
    this.Service.addrate(this.token,this.user._id,this.productid,this.rate,this.f.content.value).subscribe(res=>{
      console.log('thanh cong')
    })
  }
  get f() { return this.rateForm.controls; }
  reset(){
    this.ctrl.setValue(null);
    this.rateForm.reset();
  }
}
