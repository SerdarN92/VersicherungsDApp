import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {RequestOptions} from '@angular/http';

@Injectable()
export class ApiService {

  constructor(
    private http: HttpClient
  ) {

  }

  private formatErrors(error: any) {
    return error.error;
  }

  get(url: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(url, {params})
      .pipe(catchError(this.formatErrors));
  }

  post(url: string, body: any): Observable<any> {
    return this.http.post(
      url,
      body
    ).pipe(catchError(this.formatErrors));
  }

}
