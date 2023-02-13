import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Const } from 'const';
const AUTH_API = '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  burl=Const.appURL;
  constructor(private http: HttpClient) { }

  login(credentials: { username: any; password: any; }): Observable<any> {
    return this.http.post(this.burl+AUTH_API + 'signin', {
      username: credentials.username,
      password: credentials.password
    }, httpOptions);
  }


}