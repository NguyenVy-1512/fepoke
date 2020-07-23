import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService, DataService} from 'src/app/shared';
import { User } from 'src/app/_models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User[] = [];
  id: string;
  editProfileForm: FormGroup;
  token: string;
  check: boolean;
  constructor(
    private authenticationService: ApiService,
    private data: DataService,
    private fb: FormBuilder, private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.editProfileForm = this.fb.group({
      firstname: [''],
      lastname: [''],
      username: [''],
      email: ['']
     });
    return this.authenticationService.getUser().subscribe(
      res => {
        this.user = res;
      });
      
  }
  openModal(targetModal, user) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static'
    });
    this.id = user._id
    this.check = user.isVerified
    this.editProfileForm.patchValue({
      firstname: user.name,
      lastname: user.phone,
      username: user.address,
      email: user.email
     });
  }
  get f() { return this.editProfileForm.controls; }
    onSubmit() {
     this.modalService.dismissAll();
     console.log("res:", this.editProfileForm.getRawValue());
    }
    cancel(){
      this.authenticationService.deleteuser(this.id).subscribe(res =>
        {
          console.log("hủy thành công");
        })
      }
      valuechang(e){
        return this.authenticationService.getUser().subscribe(
          res => {
            this.user = res;
          });
      }
}
