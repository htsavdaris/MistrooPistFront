import { Injectable, Inject  } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { retry, catchError, map } from 'rxjs/operators';
import { Nomiko } from 'src/app/models/nomiko'
import { environment } from 'src/environments/environment';
import { DataService } from './data.service';


@Injectable({
  providedIn: 'root'
})
export class NomikaService extends DataService<Nomiko, number> {

  constructor(protected _http: HttpClient) {
    super(_http);
  }

  getResourceUrl(): string {
    return `${environment.baseUrl}/api/nomika`;
  }
}

