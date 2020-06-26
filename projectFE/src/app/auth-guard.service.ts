import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {

  constructor() { }
}

/* 
dùng để bảo vệ route check-out, chỉ cho vào route check-out sau khi đăng nhập
dùng tương tự với route my-info, my-order, order-success, admin page
*/