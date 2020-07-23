import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as io from 'socket.io-client';
import { User, mess } from '../_models';
import { DataService, ApiService } from '../shared';
const SOCKET_ENDPOINT = 'pokeshop98.herokuapp.com';
//const SOCKET_ENDPOINT = 'localhost:3000';
@Component({
  selector: 'app-chat-socket',
  templateUrl: './chat-socket.component.html',
  styleUrls: ['./chat-socket.component.css']
})
export class ChatSocketComponent implements OnInit {
 message: string
 socket;
 loading: boolean;
 user: User;
 ChangeInfoForm: FormGroup;
 a: string[] =[];
 mess: mess[] = [];
 name: string;
  constructor(private formBuilder: FormBuilder,
    private data: DataService,
    private sevice: ApiService) {
   }

  ngOnInit() {
    this.data.currentuser.subscribe(user => this.user = user)
    this.sevice.getmess().subscribe(res=>{
      this.mess = res;
      this.mess.sort(function(a,b){
        let comparison = 0;
        if (a.createdAt > b.createdAt) {
            comparison = 1;
        } else if (a.createdAt < b.createdAt) {
            comparison = -1;
       }
          return comparison;
        });
        console.log(this.mess)
      })
    this.a[1] = this.user.name
    console.log(this.user.name)
    this.name = this.user._id
  this.setupSocketConnection();
}
setupSocketConnection() {
  this.socket = io(SOCKET_ENDPOINT);
  //this.socket = io();
  this.socket.on('message-broadcast', (data: string[]) => {
  if (data) {
   const element = document.createElement('li');
   element.innerHTML = data[1] + ": " + data[0];
   element.style.background = 'white';
   element.style.padding =  '15px 30px';
   element.style.margin = '10px';
   document.getElementById('message-list').appendChild(element);
   console.log("huhu")
   }
 });
}
SendMessage() {
  this.data.currentuser.subscribe(user => this.user = user)

  this.sevice.addmess(this.user._id, this.message, this.user.name).subscribe(res=>{
  })
  this.a[0] = this.message;
  this.socket.emit('message', this.a);
  console.log(this.message)
  const element = document.createElement('li');
  element.innerHTML = this.message +" :" + this.a[1];
  element.style.background = 'white';
  element.style.padding =  '15px 30px';
  element.style.margin = '10px';
  element.style.textAlign = 'right';
  document.getElementById('message-list').appendChild(element);
  this.message = '';
   
}
///////////////////////////////////
}