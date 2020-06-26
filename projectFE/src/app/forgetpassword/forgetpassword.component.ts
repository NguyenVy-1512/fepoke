import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared';

@Component({
  selector: 'forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit {
  resetForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: ApiService
  ) { }

  ngOnInit() {
    this.resetForm = this.formBuilder.group({
      mail: ['', Validators.required],
  });
  }
  get f() { return this.resetForm.controls; }
  onreset(){
    this.authenticationService.resetpass(this.f.mail.value)
    .subscribe(
        res => {console.log('ckeck mail nha!');});
  }

}
