import { Injectable } from '@angular/core';
import { Fournisseur } from '../model/fournisseur';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Const } from 'const';
@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  uu=Const.appURL;
  private baseUrl = this.uu+'/api/fournisseurs';
  choixmenu : string  = 'A';
  listData : Fournisseur[];
  public dataForm: FormGroup; 
  constructor(private http: HttpClient) { }
 
 
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  createData(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }
  
  updatedata(id: number, value: any): Observable<Object> {
    return this.http.put(`${this.baseUrl}/${id}`, value);
  }
 
  deleteData(id: number): Observable<any> {
   
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }

  getAll(): Observable<any> {
   
    return this.http.get(`${this.baseUrl}`);
  }
}
