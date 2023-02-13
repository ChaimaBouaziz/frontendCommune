import { Injectable } from '@angular/core';
import { Detailsoperation } from '../model/detailsoperation';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { Const } from 'const';
@Injectable({
  providedIn: 'root'
})
export class DetailsoperationService {
  uu=Const.appURL;
  private baseUrl = this.uu+ '/api/detailsoperations';
  detailsoperation: Detailsoperation = new Detailsoperation();
  detailsoperationList: Detailsoperation[];
  constructor(private http: HttpClient) { }
  addDetailsOperation(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }
  getAll(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }


}
