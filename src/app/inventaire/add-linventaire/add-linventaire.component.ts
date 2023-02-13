import { Component, OnInit, Inject } from '@angular/core';
import { Article } from '../../model/article';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { ArticleService } from '../../service/article.service';
import { NgForm } from '@angular/forms';
import { Linventaire } from '../../model/linventaire';
import { InventaireService } from '../../service/inventaire.service';
import { LinventaireService } from '../../service/linventaire.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
@Component({
  selector: 'app-add-linventaire',
  templateUrl: './add-linventaire.component.html',
  styleUrls: ['./add-linventaire.component.scss']
})
export class AddLinventaireComponent {
  Inventid: number;
  formData: FormGroup;
  qte: number;
  articleList:Article[];
  isValid:boolean=true;
  constructor( public service:LinventaireService,private toastr :ToastrService,
    @Inject(MAT_DIALOG_DATA)  public data :any,
    public dialogRef:MatDialogRef<AddLinventaireComponent>,
    private articleService:ArticleService,
    private inventaireService:InventaireService,public fb: FormBuilder){
      this.Inventid = this.data.inventId;
    }
    get f() { return this.formData.controls; }
    ngOnInit() {
      if(this.data.linventaireIndex==null)
      {
        this.InfoForm();
      }
      else 
      {
       this.formData =this.fb.group(Object.assign({},this.inventaireService.list[this.data.linventaireIndex]));
      }
     this.articleService.getAll().subscribe(
        response =>{this.articleList= response;
      
        }
       );
    
  }
    
  InfoForm() {
    this.formData = this.fb.group({
        id: null,
        qteStock :this.qte,
        libelle:'',
        qteInvent : 0,
       inventId : this.Inventid ,
      });
    } 
  
    onSubmit() {
      let referenceExists = false;
      let existingIndex = -1;
      for (let i = 0; i < this.inventaireService.list.length; i++) {
          if (this.inventaireService.list[i].libelle === this.formData.value.libelle) {
              referenceExists = true;
              existingIndex = i;
              break;
          }
      }
      if (referenceExists) {
          this.inventaireService.list[existingIndex].qteInvent = 0+this.formData.value.qteInvent;
          this.toastr.info("La référence existe déjà, la quantité est incrémentée !");


      } else {
          this.inventaireService.list.push(this.formData.value);
          this.toastr.success("La référence est ajoutée à la liste !");
      }
   
      this.dialogRef.close();
  }
  
  validateForm(formData:Linventaire){
    this.isValid=true;
    if(formData.libelle=='')
      this.isValid=false;
      else if(formData.qteInvent ==0)
      this.isValid=false;
      return this.isValid;
  }
  onLibelleSelected() {
    let selectedArticle = this.articleList.find(article => article.libelle === this.formData.value.libelle);
    if(selectedArticle) {
      this.formData.patchValue({qteStock: selectedArticle.qteStock});
    }
  }


}