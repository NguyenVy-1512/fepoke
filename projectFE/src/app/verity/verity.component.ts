import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../shared';

@Component({
  selector: 'app-verity',
  templateUrl: './verity.component.html',
  styleUrls: ['./verity.component.css']
})
export class VerityComponent implements OnInit {

  id: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: ApiService
  ) { }

  ngOnInit() {
  }
  onreset(){
    this.id = this.route.snapshot.url[1].path;
    this.authenticationService.verity(this.id)
    .subscribe(
        res => {console.log('ckeck mail nha!');});
  }

}
