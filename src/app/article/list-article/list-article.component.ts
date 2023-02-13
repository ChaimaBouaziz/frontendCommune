import { Component, OnInit,Inject ,ViewChild} from '@angular/core';
import { ArticleService} from '../../service/article.service';
import { ToastrService } from 'ngx-toastr';
import { Article} from '../../model/article';
import { Observable } from "rxjs";
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { AddArticleComponent } from '../../article/add-article/add-article.component';
import { TokenStorageService } from 'src/app/service/token-storage.service';
import { ConfirmDialogComponent } from 'src/app/confirmDialog/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss']
})
export class ListArticleComponent {
  isLoggedIn = false;
  private roles: string[];
  showAdminBoard = false;
  p: number =1;
  article : Article;
  control: FormControl = new FormControl('');
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(public crudApi: ArticleService, public toastr: ToastrService, private dialog: MatDialog,
    private router : Router,public fb: FormBuilder,
    private matDialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef:MatDialogRef<AddArticleComponent>,private tokenStorageService: TokenStorageService) { }
 
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
    this.matDialog.open(AddArticleComponent, dialogConfig);
  }
 
  

  
  getData() {
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
   
  }
  
 
  removeData(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet article ?' }
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
 
  
  
  
  selectData(item : Article) {
    this.crudApi.choixmenu = "M";
    this.crudApi.dataForm = this.fb.group(Object.assign({},item));
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width="50%";
    
    this.matDialog.open(AddArticleComponent, dialogConfig);
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
      PDF.save('articles.pdf');
    });
  }
    
}