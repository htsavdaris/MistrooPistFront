import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

export interface DataOperations<T, ID> {
  save(t: T): Observable<T>;
  update(id: ID, t: T): Observable<T>;
  getOne(id: ID): Observable<T>;
  getAll(): Observable<T[]>;
  delete(id: ID): Observable<any>;
}

@Injectable({
  providedIn: 'root'
})
export abstract class DataService<T, ID> implements DataOperations<T, ID> {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  abstract getResourceUrl(): string;


  constructor(
    protected _http: HttpClient
  ){}

  save(t: T): Observable<T> {
    return this._http.post<T>(this.getResourceUrl(), t).pipe(
      retry(1),
      catchError(this.errorHandler)
    );;
  }

  update(id: ID, t: T): Observable<T> {
    return this._http.put<T>(this.getResourceUrl() + "/" + id, t, {}).pipe(
      retry(1),
      catchError(this.errorHandler)
    );;
  }

  getOne(id: ID): Observable<T> {
    return this._http.get<T>(this.getResourceUrl() + "/" + id).pipe(
               retry(1),
               catchError(this.errorHandler)
             );
  }

  getAll(): Observable<T[]> {
    return this._http.get<T[]>(this.getResourceUrl()).pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  delete(id: ID): Observable<T> {
    return this._http.delete<T>(this.getResourceUrl() + '/' + id).pipe(
      retry(1),
      catchError(this.errorHandler)
    );;
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

