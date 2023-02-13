import { Component, Inject, OnInit } from '@angular/core';
import {Validator,ReactiveFormsModule,FormGroup,FormBuilder, FormControl } from '@angular/forms';
import { MatDialog,MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Categorie } from 'src/app/model/categorie';
import { CategorieService } from 'src/app/service/categorie.service';
import { AddCategorieComponent } from '../add-categorie/add-categorie.component';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { NgModule } from "@angular/core";
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { ConfirmDialogComponent } from 'src/app/confirmDialog/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-list-categorie',
  templateUrl: './list-categorie.component.html',
  styleUrls: ['./list-categorie.component.scss']
})
export class ListCategorieComponent implements OnInit{
  categorie : Categorie;
  control: FormControl=new FormControl('');
  p: number =1;
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  //showReclamationBoard = false;
  constructor(public crudApi: CategorieService,public toastr: ToastrService,private router :Router,private dialog: MatDialog,
    public fb :FormBuilder, private matDialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<AddCategorieComponent>,private tokenStorageService: TokenStorageService){}
  ngOnInit() {
    this.getData();
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      //this.showReclamationBoard = this.roles.includes('ROLE_RECLAMATION');
      //console.log(this.showReclamationBoard);
    }
  }
  addCategorie(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.matDialog.open(AddCategorieComponent,dialogConfig);

  }
  getData(){
    this.crudApi.getAll().subscribe(
Response => {this.crudApi.listData=Response;}
    );
  }
  removeData(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet catégorie ?' }
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
 
  
  selectData(item :Categorie){
    this.crudApi.choixmenu="M";
    this.crudApi.dataForm= this.fb.group(Object.assign({},item));
    const dialogConfig =new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";

    this.matDialog.open(AddCategorieComponent,dialogConfig);
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
      PDF.save('categories.pdf');
    });
  }
}