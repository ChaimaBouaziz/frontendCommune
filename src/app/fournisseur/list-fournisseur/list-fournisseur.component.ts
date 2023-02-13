import { Component, Inject, OnInit } from '@angular/core';
import {Validator,ReactiveFormsModule,FormGroup,FormBuilder, FormControl } from '@angular/forms';
import { MatDialog,MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Fournisseur } from 'src/app/model/fournisseur';
import { FournisseurService } from 'src/app/service/fournisseur.service';
import { AddFournisseurComponent } from '../add-fournisseur/add-fournisseur.component';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { NgModule } from "@angular/core";
import { TokenStorageService } from 'src/app/service/token-storage.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConfirmDialogComponent } from 'src/app/confirmDialog/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-list-fournisseur',
  templateUrl: './list-fournisseur.component.html',
  styleUrls: ['./list-fournisseur.component.scss']
})
export class ListFournisseurComponent {
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  p: number =1;
  fournisseur : Fournisseur;
  control: FormControl=new FormControl('');
  constructor(public crudApi: FournisseurService,public toastr: ToastrService,private router :Router,private dialog: MatDialog,
    public fb :FormBuilder, private matDialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<AddFournisseurComponent>,private tokenStorageService: TokenStorageService){}
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
  addfournisseur(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.matDialog.open(AddFournisseurComponent,dialogConfig);

  }
  getData(){
    this.crudApi.getAll().subscribe(
Response => {this.crudApi.listData=Response;}
    );
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
      PDF.save('fournisseurs.pdf');
    });
  }
  
  removeData(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet fournisseur ?' }
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
  transform(values: any[], startDate: Date, endDate: Date): any[] {
    if (!values || !startDate || !endDate) {
      return values;
    }

    return values.filter(value => {
      const date = new Date(value.dateEmbauche);
      return date >= startDate && date <= endDate;
    });
  }
  selectData(item :Fournisseur){
    this.crudApi.choixmenu="M";
    this.crudApi.dataForm= this.fb.group(Object.assign({},item));
    const dialogConfig =new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";

    this.matDialog.open(AddFournisseurComponent,dialogConfig);
  }
}