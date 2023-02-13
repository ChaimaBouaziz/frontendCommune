import { Component, OnInit, Inject } from '@angular/core';
import { Article } from '../../model/article';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../../service/article.service';
import { NgForm } from '@angular/forms';
import { Detailsoperation } from '../../model/detailsoperation';
import { EntreService } from '../../service/entre.service';
import { DetailsoperationService } from '../../service/detailsoperation.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';

@Component({
  selector: 'app-add-detailsoperation',
  templateUrl: './add-detailsoperation.component.html',
  styleUrls: ['./add-detailsoperation.component.scss']
})
export class AddDetailsoperationComponent {
  Operationid: number;
  formData: FormGroup;
  articleList: Article[];
  isValid: boolean = true;
  constructor(public service: DetailsoperationService, private toastr: ToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<AddDetailsoperationComponent>,
    private articleService: ArticleService,
    private entreService: EntreService, public fb: FormBuilder) {
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
      
      this.formData = this.fb.group(Object.assign({}, this.entreService.list[this.data.index]));
    
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
  
    if(this.data.index==null)
    {
      this.entreService.list.push(this.formData.value)
      this.dialogRef.close();
    }
    else
  {
    
    this.entreService.list[this.data.index] = this.formData.value;
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