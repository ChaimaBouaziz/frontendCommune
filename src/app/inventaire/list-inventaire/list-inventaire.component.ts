import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { InventaireService } from '../../service/inventaire.service';
import { Inventaire } from '../../model/inventaire';
import { DatePipe } from '@angular/common';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ConfirmDialogComponent } from 'src/app/confirmDialog/confirm-dialog/confirm-dialog.component';
@Component({
  selector: 'app-list-inventaire',
  templateUrl: './list-inventaire.component.html',
  styleUrls: ['./list-inventaire.component.scss']
})
export class ListInventaireComponent {


  
    p: number =1;
    inventaireListe:any;
    SearchText :string;
    constructor( private service :InventaireService,private router:Router,private dialog: MatDialog,
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
  
  
  onDelete(id: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { message: 'Êtes-vous sûr de vouloir supprimer cet inventaire ?' }
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
    this.router.navigate(['/home/inventaire']);
    }
  
    onSelect(item :Inventaire){
    
      this.service.formData = this.fb.group(Object.assign({},item));
      this.service.formData.patchValue({
        date: this.transformDate(item.dateInventaire)
      });
      this.service.choixmenu ="M"
      this.router.navigate(['/home/inventaire']);
    }
    
    transformDate(date: any) {
      return this.datePipe.transform(date, 'yyyy-MM-dd');
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
        PDF.save('inventaires.pdf');
      });
    }  
  }
