import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Inventaire } from '../model/inventaire';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Const } from 'const';
@Injectable({
  providedIn: 'root'
})
export class InventaireService {
  uu=Const.appURL;
  private baseUrl = this.uu+ '/api/invents';
  public formData:  FormGroup; 
  list: any={}
  inventaire : Inventaire;

  constructor(private http:HttpClient,private toastr: ToastrService) { }
  choixmenu : string  = "A";
  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  saveOrUpdate(info: Object) {
   
   return this.http.post(`${this.baseUrl}`,info);
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
  
  deleteAll(id: number): Observable<any> {
  
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
