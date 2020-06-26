import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, ApiService, DataService } from '../shared';
import { User } from '../_models';
@Component({
  selector: 'my-info',
  templateUrl: './my-info.component.html',
  styleUrls: ['./my-info.component.css']
})
export class MyInfoComponent implements OnInit {
  ChangePasswordForm: FormGroup;
  ChangeInfoForm: FormGroup;
  form: FormGroup;
  submitted = false;
  id: string;
  user: User;
  token: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: ApiService,
    private alertService: AlertService,
    private data: DataService) { }
  ngOnInit(){
    this.id = this.route.snapshot.params.iduser;
    this.data.currenttoken.subscribe(token=> this.token = token);
    this.data.currentuser.subscribe(user=> this.user = user);
    this.ChangePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    });
    this.ChangeInfoForm = this.formBuilder.group({
      name: ['', Validators.required],
      mail: ['', Validators.required]
    });
  }

  get f() { return this.ChangePasswordForm.controls; }
  get find() { return this.ChangeInfoForm.controls; }
  changepass() {
    
    
    this.submitted = true;

    // stop here if form is invalid
    //if (this.ChangePasswordForm.invalid) {
      //return;
    //}
    console.log(this.token);
    //this.loading = true;
    this.authenticationService.changepassword( this.token, this.f.password1.value, this.f.password2.value )
    .subscribe(res=>
     {
          this.alertService.success('change password successful', true);
          this.router.navigate(['/login']);
          this.data.changeMessage(false);
          this.data.changeToken("");
     },
        error => {
          this.alertService.error(error);
          //this.loading = false;
        });
  }
   changeinfo(){
    this.submitted = true;

    // stop here if form is invalid
    //if (this.ChangePasswordForm.invalid) {
     // return;
    //}
    if(this.find.name.value != "")
    {
      this.user.name = this.find.name.value;
      this.data.changUser(this.user);
    }
    
    if(this.find.mail.value != "")
    {
      this.user.email = this.find.mail.value;
      this.data.changUser(this.user);
    }
    this.data.currentuser.subscribe(user=> this.user = user);
    console.log(this.user);
    this.authenticationService.changeinfouser(this.token, this.user.name, this.user.email )
      .subscribe(res => {
          console.log('chang info');
          this.alertService.success('change info successful', true);
          this.router.navigate(['/my/info/'+this.id]);

        },
        error => {
          this.alertService.error(error);
          //this.loading = false;
          this.data.changeMessage(false);
        });
   }
}
