import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SortieService } from '../../service/sortie.service';
import { Sortie } from '../../model/sortie';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';

@Component({
  selector: 'app-list-details',
  templateUrl: './list-details.component.html',
  styleUrls: ['./list-details.component.scss']
})
export class ListDetailsComponent {
  p: number =1;
  sortieListe:any;
  SearchText :string;
  constructor( private service :SortieService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder,
    private datePipe : DatePipe) { }
    ngOnInit() {
    
      this.refreshListe();
      
    }
  refreshListe(){
    this.service.getAll().subscribe(
      response =>{this.sortieListe = response;}
     );
  
  }
  
    openForEdit(Id:number){
     this.router.navigate(['/home/sorties/modification/'+Id]);
    }
  
    removeData(id: number) {
      
    }
  
    onCommandeDelete(id:number){
    
  }
  
  selectCommande(item :Sortie){
    this.service.formData = this.fb.group(Object.assign({},item));
    
    this.router.navigate(['/home/sortie']);
  }
  transformDate(date:any){
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }}