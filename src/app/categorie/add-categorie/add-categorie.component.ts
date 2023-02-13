import { Component, OnInit,Inject} from '@angular/core';
import { CategorieService} from '../../service/categorie.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }from '@angular/forms';
import { Router } from '@angular/router';
import { Categorie} from '../../model/categorie';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { TokenStorageService } from 'src/app/service/token-storage.service';
@Component({
  selector: 'app-add-categorie',
  templateUrl: './add-categorie.component.html',
  styleUrls: ['./add-categorie.component.scss']
})
export class AddCategorieComponent implements OnInit{
  userCreation: number;
  userLastmodified: number;
  constructor(public crudApi: CategorieService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router, @Inject(MAT_DIALOG_DATA)  public data:any,
    public dialogRef:MatDialogRef<AddCategorieComponent>,private tokenStorage :TokenStorageService
    ) { }

  ngOnInit() {
    this.userCreation = this.tokenStorage.getUser().id;
    this.userLastmodified = this.tokenStorage.getUser().id;
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
   }


  
  infoForm() {

    this.crudApi.dataForm = this.fb.group({
        idCat: null,

        libCat: ['', [Validators.required]],
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
      this.addCategorie();
    }
    else
    {
      
     this.updateData()
    }
   
}
  
  
addCategorie() {
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.dialogRef.close();
   
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
    this.router.navigate(['/categories']); 
  });
}
  updateData()
  {
    this.crudApi.dataForm.value.userLastmodified = this.userLastmodified;
    this.crudApi.updatedata(this.crudApi.dataForm.value.idCat,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
   
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listData = response;}
       );
      this.router.navigate(['/categories']);
    });
  }


}