import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService} from 'src/app/shared';
import { User } from 'src/app/_models';
@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  user: User[] = [];
  constructor(
    private authenticationService: ApiService
  ) { }

  ngOnInit() {
    return this.authenticationService.getUser().subscribe(
      res => {
        this.user = res;
      });
      
  }

}
