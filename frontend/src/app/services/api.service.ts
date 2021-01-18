import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  get(path, params = {}) {
    return this.httpClient
      .get(this.apiUrl(path), this.getOptions(params))
      .toPromise()
  }

  post(path, params = {}) {
    return this.httpClient
      .post(this.apiUrl(path), params, this.getOptions())
      .toPromise()
  }

  delete(path, params = {}) {
    return this.httpClient
      .delete(this.apiUrl(path), this.getOptions({}, params))
      .toPromise()
  }

  patch(path, params = {}) {
    return this.httpClient
      .patch(this.apiUrl(path), params, this.getOptions())
      .toPromise()
  }

  apiUrl(path) {
    return `${environment.apiUrl}/${path}`;
  }

  private getOptions(params = {}, body = {}) {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      params,
      body
    };
  }
}
