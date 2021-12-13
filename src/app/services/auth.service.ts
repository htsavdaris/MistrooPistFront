import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';

import { Userauth } from '../models/userauth';
import { Changepass } from '../models/changepass';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public myAppUrl: string="";
  myApiUrl: string = "";
  public isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.baseUrl ;
    this.myApiUrl = 'api/user/'; 
   }

   isLoggedIn$(): Observable<boolean> {
    return this.isLoggedInSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return this.isLoggedInSubject.getValue();
  }

   authenticate(user: Userauth): Observable<string> {
    return this.http.post<string>(this.myAppUrl + this.myApiUrl + 'authenticate', JSON.stringify(user), this.httpOptions)
      .pipe(
        map((data: any) => {
          //console.log(data);
          //console.log(data.token);
          localStorage.setItem('currentUser', data.login);
          localStorage.setItem('access_token', data.token);
          this.isLoggedInSubject.next(true);
          return "Authenticated";
        }),
        catchError(error => {
          console.log(error);
          return throwError('Something went wrong!');
        })
      );
  }

  changepassword(changepass: Changepass): Observable<string> {
    return this.http.post<string>(this.myAppUrl + this.myApiUrl + 'changepassword', JSON.stringify(changepass), this.httpOptions)
      .pipe(
        map((data: any) => {                    
          return "Changed";
        }),
        catchError(error => {
          return throwError('Something went wrong!');
        })
      )
  }

  public logout() {
    console.log('Logout');
    localStorage.removeItem('access_token');   
    this.isLoggedInSubject.next(false);    
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {
    console.log('Error');
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Auth Service Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
