import { Component, OnInit, Inject } from '@angular/core';
import { Article } from '../../model/article';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../../service/article.service';
import { NgForm } from '@angular/forms';
import { Detailsoperation } from '../../model/detailsoperation';
import { SortieService } from '../../service/sortie.service';
import { DetailsoperationService } from '../../service/detailsoperation.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Component({
  selector: 'app-add-details',
  templateUrl: './add-details.component.html',
  styleUrls: ['./add-details.component.scss']
})
export class AddDetailsComponent {

  Operationid: number;
  formData: FormGroup;
  articleList: Article[];
  isValid: boolean = true;
  constructor(public service: DetailsoperationService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDetailsComponent>,
    private articleService: ArticleService,
    private sortieService: SortieService, public fb: FormBuilder) {
    this.Operationid = this.data.operationId;
  }
  get f() { return this.formData.controls; }

  ngOnInit() {
    this.articleService.getAll().subscribe(
      response => {
        this.articleList = response;

      }
    );
    if (this.data.index == null) {
      this.InfoForm();
   
    }
    else {
      
      this.formData = this.fb.group(Object.assign({}, this.sortieService.list[this.data.index]));
    
    }


  }
  
  InfoForm() {
    this.formData = this.fb.group({
      id: null,
      qte: 0,
      idArticle: 0,
      operationId: this.Operationid,
      numeroOperation:0,
    });
  }




  onSubmit() {
    let referenceExists = false;
    let existingIndex = -1;
    for (let i = 0; i < this.sortieService.list.length; i++) {
      if (this.sortieService.list[i].idArticle === this.formData.value.idArticle) {
        referenceExists = true;
        existingIndex = i;
        break;
      }
    }
    if (referenceExists) {
      this.sortieService.list[existingIndex].qte += this.formData.value.qte;
      this.toastr.info("La référence existe déjà, la quantité est incrémentée !");
    } else {
      this.sortieService.list.push(this.formData.value);
      this.toastr.success("La référence est ajoutée à la liste !");
    }

    this.dialogRef.close();
  }
  validateForm(formData: Detailsoperation) {
    this.isValid = true;
    if (formData.idArticle ==0)
      this.isValid = false;
    else if (formData.qte == 0)
      this.isValid = false;
    return this.isValid;
  }
}