import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InventaireService } from '../../service/inventaire.service';
import { Inventaire } from '../../model/inventaire';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Component({
  selector: 'app-list-linventaire',
  templateUrl: './list-linventaire.component.html',
  styleUrls: ['./list-linventaire.component.scss']
})
export class ListLinventaireComponent {
  p: number =1;
  inventaireListe:any;
  SearchText :string;
  constructor( private service :InventaireService,private router:Router,
    private toastr :ToastrService,public fb: FormBuilder,
    private datePipe : DatePipe) { }
    ngOnInit() {
    
      this.refreshListe();
      
    }
  refreshListe(){
    this.service.getAll().subscribe(
      response =>{this.inventaireListe = response;}
     );
  
  }

  openForEdit(Id:number){
    this.router.navigate(['/home/invents/'+Id]);
   }
 
   removeData(id: number) {
     
   }
 
   onCommandeDelete(id:number){
   
 }
 
 selectCommande(item :Inventaire){
   this.service.formData = this.fb.group(Object.assign({},item));
   
   this.router.navigate(['/home/inventaire']);
 }
 transformDate(date:any){
   return this.datePipe.transform(date, 'yyyy-MM-dd');
 }}

