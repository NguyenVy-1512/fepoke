import { Component, OnInit, Input } from '@angular/core';
import { DataService, ApiService } from '../shared';
import { rating, User } from '../_models';
import { Console } from 'console';

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css'],
  styles: [`
  .star {
  font-size: 30px;
  color: #ebebeb;
  }
  .filled {
  color: #FFD656;
  }
  `]
})
export class CommentComponent implements OnInit {
  @Input() id: rating;
  name: string;
  date: Date;
  constructor(
    private data: DataService,
    private service: ApiService
  ) { }

  ngOnInit() {
    console.log(this.id);
   this.service.getUserByID(this.id.userID).subscribe(res =>{
    console.log(res);
     this.name = res.name;
   })
   this.date = this.id.createdAT;
  }
}
