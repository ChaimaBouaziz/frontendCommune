import { Injectable } from '@angular/core';
import { Entre } from '../model/entre';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { EntreDTO } from '../model/entre-dto';
import { Const } from 'const';
@Injectable({
  providedIn: 'root'
})
export class EntreService {
uu=Const.appURL;
private baseUrl = this.uu+ '/api/entres';
  public formData:  FormGroup; 
  list: any={}
  entreDTO: EntreDTO;
  entre : Entre;
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
