import { EmailValidators } from './email.validators';
import { Router } from '@angular/router';
import { AlertService, ApiService } from '../shared';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit{
  registerForm: FormGroup;
  loading = false;
  submitted = false;

  constructor(
      private formBuilder: FormBuilder,
      private router: Router,
      private userService: ApiService,
      private alertService: AlertService) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
        email: ['', Validators.required],
          name: ['', Validators.required],
          password: ['', [Validators.required, Validators.minLength(6)]],
          rule: ['user'],
          phone: ['', Validators.required]
         
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.registerForm.invalid) {
          return;
      }
      console.log(this.registerForm.value);
      
      this.loading = true;
      this.userService.register(this.registerForm.value)
          .subscribe((
              result) => {
                  console.log('done');
                  this.alertService.success('Registration successful', true);
                  this.router.navigate(['/login']);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });
      
  }
  get username(){
    return this.registerForm.get('username');
  }

  get password(){
    return this.registerForm.get('password');
  }

  get phone(){
    return this.registerForm.get('phone');
  }

  get mail(){
    return this.registerForm.get('mail');
  }
  login(){
    this.registerForm.setErrors({
      invalidLogin: true
    });
  }
  

}
