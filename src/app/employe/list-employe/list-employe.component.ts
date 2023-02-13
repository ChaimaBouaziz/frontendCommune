import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Employe } from '../../model/employe';
import { EmployeService } from 'src/app/service/employe.service';
import { AddEmployeComponent } from '../add-employe/add-employe.component';

import { TokenStorageService } from 'src/app/service/token-storage.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConfirmDialogComponent } from 'src/app/confirmDialog/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-list-employe',
  templateUrl: './list-employe.component.html',
  styleUrls: ['./list-employe.component.scss']
})
export class ListEmployeComponent {
  employe: Employe;
  p: number =1;
  control: FormControl = new FormControl('');
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  constructor(public crudApi: EmployeService, public toastr: ToastrService,private dialog: MatDialog,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddEmployeComponent>,private tokenStorageService: TokenStorageService) { }
 
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
  addarticle()
  {
    this.crudApi.choixmenu = "A";
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    this.matDialog.open(AddEmployeComponent, dialogConfig);
  }
 
  

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
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
      PDF.save('employes.pdf');
    });
  }
 
  removeData(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet employe ?' }
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
 
  selectData(item : Employe) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddEmployeComponent, dialogConfig);
  }

 
    
}