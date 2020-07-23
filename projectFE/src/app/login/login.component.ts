import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, ApiService, DataService } from '../shared';
import { User } from '../_models';
import { CookieService } from 'ngx-cookie-service'
import * as io from "socket.io-client";


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  user: User;
  token: string;
  //private url = 'http://localhost:4200';
    //private socket;
 // @Output() islogin = new EventEmitter<boolean>();
  constructor(
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: ApiService,
      private alertService: AlertService,
      private data: DataService,
      private cookieService: CookieService,
      ) {
      }

  ngOnInit() {
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
      this.data.currenttoken.subscribe(token => this.token = token);
      console.log(this.token);
      
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      console.log(this.token);
      //this.loading = true;
      this.authenticationService.login(this.f.email.value, this.f.password.value)
          .subscribe(
              res => {
                console.log(res);
                this.alertService.success('Login successful', true);
                this.data.setlocalstore("token",'Bearer '+ res.token);
                this.data.setlocalstore("id", res.user._id);
                this.data.setlocalstore("name", res.user.name);
                this.data.changeToken('Bearer '+ res.token);
                this.data.changUser(res.user);
                this.data.currentuser.subscribe(user => this.user = user);
                if(res.user.role == 'admin'){
                this.data.changinadmin(true);
               
                this.router.navigate(['/admin/dashboard']);
                }
                else {
                    this.data.changinadmin(false);
                    this.router.navigate(['/']);
                }
                //   this.cookieService.set('userID', res.user._id);
                //   this.cookieService.set('token', res.token);
                //   sessionStorage.setItem("admin", JSON.stringify(res.token));
              },
              error => {
                  this.alertService.error(error);
                  //this.loading = false;
                  this.data.changeMessage(false);
              });
              this.data.changeMessage(true);
  }
 
  // testlognin() {
  //   this.islogin.emit(this.loading); 
  //   if(this.loading=true){
  //     console.log("da dang nhap");
  //   }   //Phát sự kiện - có kèm dữ liệu loading
  // }
}
