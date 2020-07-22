import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as io from 'socket.io-client';
import { User } from '../_models';
import { DataService } from '../shared';
const SOCKET_ENDPOINT = 'https://pokeshop98.herokuapp.com';
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
  constructor(private formBuilder: FormBuilder,
    private data: DataService) {
   }

  ngOnInit() {
    this.setupSocketConnection();
}
setupSocketConnection() {
  this.socket = io(SOCKET_ENDPOINT);
  this.socket.on('message-broadcast', (data: string[]) => {
  if (data) {
   const element = document.createElement('li');
   element.innerHTML = data[1] + ": " + data[0];
   element.style.background = 'white';
   element.style.padding =  '15px 30px';
   element.style.margin = '10px';
   document.getElementById('message-list').appendChild(element);
   }
 });
}
SendMessage() {
  this.data.currentloading.subscribe(loading => this.loading = loading)
  var data: string[] = [];
  data[0] = this.message;
  if(this.loading == true)
  {
    this.data.currentuser.subscribe(user => this.user = user)
    data[1] = this.user.name
    console.log(this.user.name)
  }
  else{
    data[1] = "user"
  }
  this.socket.emit('message', data);
  console.log(this.message)
  const element = document.createElement('li');
  element.innerHTML = this.message +" :" + data[1];
  element.style.background = 'white';
  element.style.padding =  '15px 30px';
  element.style.margin = '10px';
  element.style.textAlign = 'right';
  document.getElementById('message-list').appendChild(element);
  this.message = '';
  

}
///////////////////////////////////
}