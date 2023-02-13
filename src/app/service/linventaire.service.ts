import { Injectable } from '@angular/core';
import { Linventaire } from '../model/linventaire';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Const } from 'const';
@Injectable({
  providedIn: 'root'
})
export class LinventaireService {
  uu=Const.appURL;
  private baseUrl = this.uu+ '/api/linvents';
  linventaire : Linventaire = new Linventaire();
  LinventaireList : Linventaire[];
  constructor(private http: HttpClient) { }
  addLinventaires(info: Object): Observable<Object> {
    return this.http.post(`${this.baseUrl}`, info);
  }
 getAll(id: number): Observable<Object> {
   return this.http.get(`${this.baseUrl}/${id}`);
 }
 
}
