import { Injectable } from '@angular/core';
import { User, products, category } from '../_models';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, tap, retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class ApiService {
  //Define API
  //apiURL = 'http://137.135.125.91:3000'
  httpOption;
  apiURL = 'http://localhost:3000'
  constructor(
    private http: HttpClient

  ) { }

  //HTTP Option
  httpOpt = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  //payment 
  payment(Authorization: string, stripetoken, amount: number, phone, shippingaddr, method): Observable<any> {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Authorization
      })
    }
    return this.http.post<any>(this.apiURL + '/payment', { amount: amount, stripetoken: stripetoken, phone: phone, shippingaddr: shippingaddr, method: method }, this.httpOption).pipe(
      retry(3),
      catchError(error=>{
        return this.handleError(error)
      })
    )
  }

  //Admin - get user
  getUser(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/user').pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  //Get user by ID
  getUserByID(id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/user/'+ id).pipe(
      retry(1),
      catchError(this.handleError)
    )
  }
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiURL + `/user/login`, { email: email, password: password }, this.httpOpt)
      .pipe(
        catchError(this.handleError));
  }

  logout(Authorization: string) {
    // remove user from local storage to log user out
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Authorization
      })
    }
    return this.http.post<any>(this.apiURL + `/user/logout`,{Authorization: Authorization}, this.httpOption)
      .pipe(
        tap((data: any) => {
          console.log(data);
        }),
        catchError(error => {
          return this.handleError(error)
        }));
  }
  register(name, phone, address, password, email, role) {
    return this.http.post(this.apiURL + `/user/signup`, {name: name, phone: phone, address: address, password: password, email: email, role: role}, this.httpOpt)
      .pipe(
        tap((data: any) => {
          console.log(data);

        }),
        catchError(error => {
          return this.handleError(error)
        }));
  }
  changepassword(Authorization: string, password1: string, password2: string, ) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Authorization
      })
    }
    return this.http.patch(this.apiURL + `/user/changepassword`, {Authorization: Authorization, password1: password1, password2: password2 }, this.httpOption)
      .pipe(
        catchError(error => {
          return this.handleError(error)
        }));
  }

  changeinfouser(Authorization: string, name: string, mail: string) {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Authorization
      })
    }
    return this.http.patch(this.apiURL + `/user/changeprofile`, {Authorization: Authorization, name: name, email: mail }, this.httpOption)
      .pipe(
        catchError(error => {
          return this.handleError(error)
        }));
  }

  infouser(id: string): Observable<any> {
    return this.http.get<any>(this.apiURL + `/user/profile/`+ id, this.httpOpt)
      .pipe(
        catchError(error => {
          return this.handleError(error)
        }));
  }
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }
 
  resetpass(mail: string){
    return this.http.post(this.apiURL + '/user/resetpassword', {email: mail} , this.httpOpt)
    .pipe(
      catchError(error => {
        return this.handleError(error)
      }));
  }

  verity(id){
    return this.http.post(this.apiURL + '/user/verify/' + id, this.httpOpt)
    .pipe(
      catchError(error => {
        return this.handleError(error)
      }));
  }

  getCategory(id): Observable<category> {
    return this.http.get<category>(this.apiURL + '/category/' + id, this.httpOpt).pipe(
     catchError(this.handleError));
  }

  getProductByCategories(name): Observable<category> {
    return this.http.get<category>(this.apiURL + '/category/cate/'+ name ,this.httpOpt).pipe(
     catchError(this.handleError));
  }

  getProducts(): Observable<products[]> {
    return this.http.get<products[]>(this.apiURL + '/product/v1', this.httpOpt).pipe(
     catchError(this.handleError));
  }
  getProduct(id): Observable<any> {
    return this.http.get(this.apiURL + '/product/' + id, this.httpOpt).pipe(
      map(this.extractData), catchError(this.handleError));
  }
  addProduct(name, desc, price,rating, qty, imgurl, category): Observable<any> {
    return this.http.post<any>(this.apiURL + '/product/add', {name: name, desc: desc, price: price, rating: rating, qty:qty, imgurl:imgurl, category:category}, this.httpOpt).pipe(
      catchError(error => {
        return this.handleError(error)
      }));
  }
  updateProduct(id, desc ): Observable<any> {
    return this.http.patch(this.apiURL + '/product/' + id, {desc: desc}, this.httpOpt).pipe(
      catchError(error => {
        return this.handleError(error)
      }));
  }
  deleteProduct(id): Observable<any> {
    return this.http.delete<any>(this.apiURL + '/product/' + id, this.httpOpt).pipe(
      catchError(error => {
        return this.handleError(error)
      }));
  }

  addorder(productid, userid, quantity,email, phone, address): Observable<any> {

    return this.http.post<any>(this.apiURL + '/order/add', {productid: productid, userid: userid, quantity: quantity, phone: phone, address: address, email: email
    } ,this.httpOpt).pipe(
     catchError(this.handleError));
  }

  getorder(): Observable<any> {
    return this.http.get<any>(this.apiURL + '/order', this.httpOpt).pipe(
     catchError(this.handleError));
  }

  getorderbyID(id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/order/'+id ,this.httpOpt).pipe(
     catchError(this.handleError));
  }

  getorderbyuser(id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/order/user/'+id ,this.httpOpt).pipe(
     catchError(this.handleError));
  }

  deleteOrder(id, Authorization): Observable<any> {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Authorization
      })
    }
    return this.http.delete<any>(this.apiURL + '/order/' + id, this.httpOption).pipe(
      catchError(error => {
        return this.handleError(error)
      }));
  }
  getOrder(id, Authorization): Observable<any> {
    this.httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': Authorization
      })
    }
    return this.http.get<any>(this.apiURL + '/order/' + id, this.httpOption).pipe(
      catchError(error => {
        return this.handleError(error)
      }));
  }

  addrate( userID, productID, rate,content): Observable<any> {
    return this.http.post<any>(this.apiURL + '/rating', { userID: userID, productID: productID, rate: rate, content: content} ,this.httpOpt).pipe(
     catchError(this.handleError));
  }

  getratingbyid(id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/rating/'+id ,this.httpOpt).pipe(
     catchError(this.handleError));
  }

  getratingbyuser(id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/rating/user/'+id ,this.httpOpt).pipe(
     catchError(this.handleError));
  }

  getratingbyproduct(id): Observable<any> {
    return this.http.get<any>(this.apiURL + '/rating/product/'+id ,this.httpOpt).pipe(
     catchError(this.handleError));
  }

  updateratingbyuser(id, rate, content): Observable<any> {
    return this.http.patch<any>(this.apiURL + '/rating/'+id ,{rate: rate, content: content},this.httpOpt).pipe(
     catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };

  
}

  //Error handling
//   handleError(err){
//     let errorMessage = '';
//     if (err.error instanceof ErrorEvent){
//       //Client side error
//       errorMessage = err.error.message;
//     } else {
//       //server side error
//       errorMessage =  `Error code: ${err.status}\nMessage:${err.message}`;
//     }
//     window.alert(errorMessage);
//     return throwError(errorMessage);
//   }
// }
