import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Scategorie} from '../model/scategorie'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Const } from 'const';
@Injectable({
  providedIn: 'root'
})
export class ScategorieService {
  uu=Const.appURL;
  private baseUrl = this.uu+'/api/scategories';
  private baseUrl1 = this.uu+'/api/scategories/5';
  choixmenu : string  = 'A';
  listData : Scategorie[];
  
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }


  
  listScateg(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl1}/${id}`);
  }
 
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
