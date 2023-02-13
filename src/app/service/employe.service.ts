import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Const } from 'const';
import { Observable } from 'rxjs';

import { Employe } from '../model/employe';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  uu=Const.appURL;
  private baseUrl = this.uu+ '/api/employes';
  choixmenu: string = 'A';
  listData: Employe []=[] ;
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }


  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
  getAll(): Observable<any> {

    return this.http.get(`${this.baseUrl}`);
  }
  createData(formData: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, formData);
  }

  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }

  deleteData(id: number): Observable<any> {

    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

}
