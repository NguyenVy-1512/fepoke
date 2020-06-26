import { Component, OnInit, Input } from '@angular/core';
import { DataService, AlertService, ApiService } from '../shared';
import { Router } from '@angular/router';
import { User, products } from '../_models';

@Component({
  selector: 'admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {
  token: string;
  loading: boolean;
  user: User;
  constructor(
    private router: Router,
    private authenticationService: ApiService,
    private alertService: AlertService,
    private data: DataService
  ) { }

  ngOnInit() {
    this.data.currentloading.subscribe(loading => this.loading = loading);
    this.data.currenttoken.subscribe(token => this.token = token);
    this.data.currentuser.subscribe(user => this.user = user);
  }
  logout() {
    this.authenticationService.logout(this.token).subscribe(res => {
      this.alertService.success('Logout successful', true);
      this.router.navigate(['/']);
      this.data.changeMessage(false);
      this.data.changeToken("");
      console.log("logout rồi nè");
    },
      error => {
        this.alertService.error(error);
      });
  }
  onisproduct(){
    this.data.changisproduct(false);
  }
}
