import { Component, OnInit,Inject } from '@angular/core';
import { ScategorieService} from '../../service/scategorie.service';
import { CategorieService} from '../../service/categorie.service';
import { ArticleService} from '../../service/article.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { Router } from '@angular/router';
import { Article} from '../../model/article';
import { Categorie} from '../../model/categorie';
import { Scategorie} from '../../model/scategorie';
import { HttpResponse, HttpEventType } from '@angular/common/http';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-add-article',
  templateUrl: './add-article.component.html',
  styleUrls: ['./add-article.component.scss']
})
export class AddArticleComponent {
  CategorieList: Categorie[];
  ScategorieList: any;
  scategorie : any={};
  userCreation: number;
    userLastmodified: number;

  constructor(public crudApi: ArticleService ,public fb: FormBuilder,public toastr: ToastrService,
    public scategorieService: ScategorieService,
    public categorieService: CategorieService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data:any,
    public dialogRef:MatDialogRef<AddArticleComponent>,private tokenStorage :TokenStorageService
    
    ) { }
  ngOnInit() {
    this.userCreation = this.tokenStorage.getUser().id;
    this.userLastmodified = this.tokenStorage.getUser().id;
   if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
    this.categorieService.getAll().subscribe(
      response =>{this.CategorieList = response;}
     );
     this.scategorieService.getAll().subscribe(
      response =>{this.ScategorieList = response;}
     );

   }
  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        reference: ['', [Validators.required]],
        libelle: ['', [Validators.required]],
        qteStock: [0, [Validators.required]],
        qteMin: [0, [Validators.required]],
        qteCri: [0, [Validators.required]],
        dateCreation : new Date().toISOString().substring(0, 10),
        idCat: [0, [Validators.required]],
        idScat: [0, [Validators.required]],
        userCreation: this.userCreation,
        userLastmodified: this.userLastmodified,
      });
    }

  ResetForm() {
      this.crudApi.dataForm.reset();
  }
  onSubmit() {
    if (this.crudApi.choixmenu == "A")
    {
      this.addData();
    }
    else
    {
    this.updateData()
    }   
}
onSelectedCateg(idCat:number){
  this.scategorieService.listScateg(idCat).subscribe(
    response=>{
      this.ScategorieList=response;
    }
  )
}

onSelectedScateg(libScat: number)
{
 this.scategorieService.getData(libScat).subscribe(
    response =>{
    this.scategorie =response;

      }
   );  
} 

addData() {
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.dialogRef.close();
   
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
    this.router.navigate(['/articles']); 
  });
}
  updateData()
  {
    this.crudApi.dataForm.value.userLastmodified = this.userLastmodified;
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
      this.crudApi.getAll().subscribe(
        Response=>{this.crudApi.listData=Response;}
      );
      this.router.navigate(['/articles']); 
    });
  }

  
}

