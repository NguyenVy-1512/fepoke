import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AlertService, ApiService, DataService } from '../shared';
import { User } from '../_models';

@Component({
  selector: 'change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  ChangePasswordForm: FormGroup;
  loading = false;
  submitted = false;
  id: string;
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: ApiService,
    private alertService: AlertService,
    private data: DataService) { }

  ngOnInit() {
    this.ChangePasswordForm = this.formBuilder.group({
      oldPassword: ['', Validators.required],
      password1: ['', Validators.required],
      password2: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
  }

  // convenience getter for easy access to form fields
  get f() { return this.ChangePasswordForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.ChangePasswordForm.invalid) {
      return;
    }

    //this.loading = true;
    this.authenticationService.changepassword(this.f.oldPassword.value, this.f.password1.value, this.f.password1.value )
      .subscribe(
        res => {
          console.log(res);
          this.alertService.success('Login successful', true);
          this.router.navigate(['/my/info/'+this.id]);
          this.data.changeMessage(true);
        
        },
        error => {
          this.alertService.error(error);
          //this.loading = false;
          this.data.changeMessage(false);
        });
  }
}
