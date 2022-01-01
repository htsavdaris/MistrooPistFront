import { Injectable, Inject  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Fysiko } from 'src/app/models/fysiko'
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class FysikaService {
  
  public myAppUrl: string="";
  myApiUrl: string = "";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.baseUrl ;
    this.myApiUrl = 'api/fysika/'; 
   }

   getFysika(): Observable<Fysiko[]> {
    return this.http.get<Fysiko[]>(this.myAppUrl + this.myApiUrl )
      .pipe(
        retry(1),
        catchError(this.errorHandler)        
      );
  }
  getFysiko(fysikoid: number): Observable<Fysiko> {
    return this.http.get<Fysiko>(this.myAppUrl + this.myApiUrl + fysikoid)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  createFysiko(fysiko:Fysiko): Observable<Fysiko> {
    console.log('create called');
    return this.http.post<Fysiko>(this.myAppUrl + this.myApiUrl, JSON.stringify(fysiko), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateFysiko(fysikoid: number, fysiko:Fysiko): Observable<Fysiko> {
    console.log('update called');
    return this.http.put<Fysiko>(this.myAppUrl + this.myApiUrl + fysikoid, JSON.stringify(fysiko), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteFysiko(fysikoid: number): Observable<Fysiko> {
    console.log('delete called');
    return this.http.delete<Fysiko>(this.myAppUrl + this.myApiUrl + fysikoid)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );


  }

  errorHandler(error:any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }        
    return throwError(errorMessage);
  }

}
