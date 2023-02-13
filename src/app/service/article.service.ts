import { Injectable } from '@angular/core';
import { HttpClient , HttpRequest, HttpEvent} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Article} from '../model/article'
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Const } from 'const';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  uu=Const.appURL;
  private baseUrl = this.uu+'/api/articles';
  choixmenu : string  = 'A';
  listData : Article[];
  public dataForm:  FormGroup; 
  constructor(private http: HttpClient) { }
 
  

  getData(id: number): Observable<Object> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
 
  createData(info: object): Observable<any> {
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
