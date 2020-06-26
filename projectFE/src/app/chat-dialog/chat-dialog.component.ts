import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable, from } from 'rxjs';
import {scan} from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService, AlertService, ApiService } from '../shared';
import { products } from '../_models';

@Component({
  selector: 'chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit {

  messages: Observable<Message[]>;
  formValue: string;
  id: string;
  name: string;
  products: products[];
  product$: products[] = [];

  constructor(public chat: ChatService, public router: Router, private productsServices: ApiService) { }

  ngOnInit() {
    // appends to array after each new message is added to feedSource
    this.messages = this.chat.conversation.asObservable()
        .pipe (scan((acc, val) => acc.concat(val) ));
    console.log(this.messages);
   
  }

  sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
  }

  send(rep){
    this.name = rep;
    console.log(this.name);
    this.chat.converse(rep);
  }
  sendurl()
  {
    this.productsServices.getProducts().subscribe((data) => {
      this.products = data;
      console.log(this.name);
      for (var i = 0; i < this.products.length; i++) {
          //var string = this.products[i].name.toLowerCase();
        if (this.products[i].name == this.name) {
          this.id = this.products[i]._id;
          break;
        }
      }
      this.router.navigate(['/product-detail/' + this.id]);
      console.log(this.id);
    });
    
  }
}