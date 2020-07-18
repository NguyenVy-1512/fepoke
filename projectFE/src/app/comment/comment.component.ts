import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

}
