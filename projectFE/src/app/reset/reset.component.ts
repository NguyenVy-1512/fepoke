import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  resetForm: FormGroup;
  userid: string;
  constructor(
    private route: ActivatedRoute,
      private formBuilder: FormBuilder,
      private authenticationService: ApiService
    ) { }

  ngOnInit() {

    this.resetForm = this.formBuilder.group({
      newpassword: ['', Validators.required],
  });
  }
  get f() { return this.resetForm.controls; }
  onreset(){
    this.userid = this.route.snapshot.url[1].path;
    this.authenticationService.reset(this.f.newpassword.value, this.userid)
    .subscribe(
        res => {console.log('ckeck mail nha!');});
  }

}
