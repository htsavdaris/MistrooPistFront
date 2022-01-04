import { Injectable, Inject  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Nomiko } from 'src/app/models/nomiko'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NomikaService {

  public myAppUrl: string="";
  myApiUrl: string = "";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  
  constructor(private http: HttpClient) {
    this.myAppUrl = environment.baseUrl ;
    this.myApiUrl = 'api/nomika/'; 
   }

   getNomika(): Observable<Nomiko[]> {
    return this.http.get<Nomiko[]>(this.myAppUrl + this.myApiUrl )
      .pipe(
        retry(1),
        catchError(this.errorHandler)        
      );
  }
  getNomiko(nomikoid: number): Observable<Nomiko> {
    return this.http.get<Nomiko>(this.myAppUrl + this.myApiUrl + nomikoid)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  cretateNomiko(nomiko:Nomiko): Observable<Nomiko> {
    return this.http.post<Nomiko>(this.myAppUrl + this.myApiUrl, JSON.stringify(nomiko), this.httpOptions)      
    .pipe(
        //retry(1),
        catchError(this.errorHandler)
      );
  }

  updateNomiko(nomikoid: number, nomiko:Nomiko): Observable<Nomiko> {
    return this.http.put<Nomiko>(this.myAppUrl + this.myApiUrl + nomikoid, JSON.stringify(nomiko), this.httpOptions)
      .pipe(
        //retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteNomiko(nomikoid: number): Observable<Nomiko> {
    return this.http.delete<Nomiko>(this.myAppUrl + this.myApiUrl + nomikoid)
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
