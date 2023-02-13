import { Component, Inject, OnInit } from '@angular/core';
import {Validator,ReactiveFormsModule,FormGroup,FormBuilder, FormControl } from '@angular/forms';
import { MatDialog,MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import {  Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/model/departement';
import { DepartementService } from 'src/app/service/departement.service';
import { AddDepartementComponent } from '../add-departement/add-departement.component';
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
  selector: 'app-list-departement',
  templateUrl: './list-departement.component.html',
  styleUrls: ['./list-departement.component.scss']
})
export class ListDepartementComponent {
  p: number =1;
  departement : Departement;
  control: FormControl=new FormControl('');
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  constructor(public crudApi: DepartementService,public toastr: ToastrService,private router :Router,private dialog: MatDialog,
    public fb :FormBuilder, private matDialog:MatDialog,
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<AddDepartementComponent>,private tokenStorageService: TokenStorageService){}
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
  addDep(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";
    this.matDialog.open(AddDepartementComponent,dialogConfig);

  }
  getData(){
    this.crudApi.getAll().subscribe(
Response => {this.crudApi.listData=Response;}
    );
  }
  removeData(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet département ?' }
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
  selectData(item :Departement){
    this.crudApi.choixmenu="M";
    this.crudApi.dataForm= this.fb.group(Object.assign({},item));
    const dialogConfig =new MatDialogConfig();
    dialogConfig.autoFocus=true;
    dialogConfig.disableClose=true;
    dialogConfig.width="50%";

    this.matDialog.open(AddDepartementComponent,dialogConfig);
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
      PDF.save('departements.pdf');
    });
  }
}