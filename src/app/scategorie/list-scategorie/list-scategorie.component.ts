import { Component, OnInit,Inject } from '@angular/core';
import { ScategorieService} from '../../service/scategorie.service';
import { ToastrService } from 'ngx-toastr';
import { Scategorie} from '../../model/scategorie';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatDialogRef } from "@angular/material/dialog";
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { AddScategorieComponent } from '../../scategorie/add-scategorie/add-scategorie.component';
import { Categorie } from 'src/app/model/categorie';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConfirmDialogComponent } from 'src/app/confirmDialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-scategorie',
  templateUrl: './list-scategorie.component.html',
  styleUrls: ['./list-scategorie.component.scss']
})
export class ListScategorieComponent implements OnInit {
  p: number =1;
  scategorie : Scategorie;
  control: FormControl = new FormControl('');
  constructor(public crudApi: ScategorieService, public toastr: ToastrService,private dialog: MatDialog,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddScategorieComponent>,) { }
 
  ngOnInit() {
    
    this.getData();
  }
  addScategorie()
  {
 
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    //dialogConfig.data="gdddd";
    this.matDialog.open(AddScategorieComponent, dialogConfig);
  }
 
  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 10;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('souscategories.pdf');
    });
  }

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
   
  }
  
  
  removeData(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet sous catégorie ?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.crudApi.deleteData(id)
          .subscribe(
            data => {
              console.log(data);
              this.toastr.warning('données supprimées avec succès !');
              this.getData();
            },
            error => console.log(error));
      }
    });
  }
  selectData(item : Scategorie) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddScategorieComponent, dialogConfig);
  }

  getValue(parentCategorie:Categorie) { 
 
    if(parentCategorie!=null){
      return (parentCategorie.idCat).toString() ;
    } else {
      return "";
    }
}}