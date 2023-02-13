import { Component, OnInit,Inject} from '@angular/core';
import { ScategorieService} from '../../service/scategorie.service';
import { CategorieService} from '../../service/categorie.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }

from '@angular/forms';
import { Router } from '@angular/router';
import { Scategorie} from '../../model/scategorie';
import { Categorie} from '../../model/categorie';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { TokenStorageService } from 'src/app/service/token-storage.service';

@Component({
  selector: 'app-add-scategorie',
  templateUrl: './add-scategorie.component.html',
  styleUrls: ['./add-scategorie.component.scss']
})
export class AddScategorieComponent implements OnInit {
  CategorieList: Categorie[];
  userCreation: number;
  userLastmodified: number;
  constructor(public crudApi: ScategorieService ,public fb: FormBuilder,public toastr: ToastrService,
    
    public categorieService: CategorieService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data: any,
    public dialogRef:MatDialogRef<AddScategorieComponent>,
    private tokenStorage :TokenStorageService
    
    ) { }

  ngOnInit() {
  
  this.userCreation = this.tokenStorage.getUser().id;
  this.userLastmodified = this.tokenStorage.getUser().id;
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
    this.categorieService.getAll().subscribe(
      response =>{this.CategorieList = response;}
     );
   }


  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        idScat: null,
        idCat: ['', [Validators.required]],
        libScat: ['', [Validators.required]],
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
  
   

addData() {
  this.crudApi.createData(this.crudApi.dataForm.value).
  subscribe( data => {
    this.dialogRef.close();
   
    this.crudApi.getAll().subscribe(
      response =>{this.crudApi.listData = response;}
     );
    this.router.navigate(['/scategories']); 
  });
}
  updateData()
  {    this.crudApi.dataForm.value.userLastmodified = this.userLastmodified;

    this.crudApi.updatedata(this.crudApi.dataForm.value.idScat,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
     
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listData = response;}
       );
      this.router.navigate(['/scategories']); 
    });
  }


}