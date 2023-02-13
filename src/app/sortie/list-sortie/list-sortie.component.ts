import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SortieService } from '../../service/sortie.service';
import { Sortie } from '../../model/sortie';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConfirmDialogComponent } from 'src/app/confirmDialog/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-list-sortie',
  templateUrl: './list-sortie.component.html',
  styleUrls: ['./list-sortie.component.scss']
})
export class ListSortieComponent {

  p: number =1;
  sortieListe:any;
  SearchText :string;
  constructor( private service :SortieService,private router:Router,private dialog: MatDialog,
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
public openPDF(): void {
  let DATA: any = document.getElementById('htmlData');
  html2canvas(DATA).then((canvas) => {
    let fileWidth = 208;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    let PDF = new jsPDF('p', 'mm', 'a4');
    let position = 10;
    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    PDF.save('entres.pdf');
  });
}

onDelete(id: number) {
  const dialogRef = this.dialog.open(ConfirmDialogComponent, {
    data: { message: 'Êtes-vous sûr de vouloir supprimer cet article ?' }
  });
  
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.service.deleteAll(id)
        .subscribe(
          data => {
            console.log(data);
            this.toastr.warning(' données supprimées avec succès !');
            this.refreshListe();
          },
          error => console.log(error));
    }
  });
}




newComm()
  {
    this.service.choixmenu ="A"
  this.router.navigate(['/home/sortie']);
  }

onSelect(item :Sortie){
  
  this.service.formData = this.fb.group(Object.assign({},item));
  this.service.choixmenu ="M"
  this.router.navigate(['/home/consults']);
}
transformDate(date:any){
  return this.datePipe.transform(date, 'yyyy-MM-dd');
}
}