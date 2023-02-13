import { Component, OnInit,Inject} from '@angular/core';
import { FournisseurService} from '../../service/fournisseur.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }from '@angular/forms';
import { Router } from '@angular/router';
import { Fournisseur} from '../../model/fournisseur';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { TokenStorageService } from 'src/app/service/token-storage.service';
@Component({
  selector: 'app-add-fournisseur',
  templateUrl: './add-fournisseur.component.html',
  styleUrls: ['./add-fournisseur.component.scss']
})
export class AddFournisseurComponent {
  userCreation: number;
  userLastmodified: number;
  constructor(public crudApi: FournisseurService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router, @Inject(MAT_DIALOG_DATA)  public data:any,
    public dialogRef:MatDialogRef<AddFournisseurComponent>,private tokenStorage :TokenStorageService
    ) { }

  ngOnInit() {
    this.userCreation = this.tokenStorage.getUser().id;
    this.userLastmodified = this.tokenStorage.getUser().id;
    if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
   }


  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        nom: ['', [Validators.required]],
        adresse: ['', [Validators.required]],
        contact: ['', [Validators.required]],
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
    this.router.navigate(['/fournisseurs']); 
  });
}
  updateData()
  {
    this.crudApi.dataForm.value.userLastmodified = this.userLastmodified;
    this.crudApi.updatedata(this.crudApi.dataForm.value.id,this.crudApi.dataForm.value).
    subscribe( data => {
      this.dialogRef.close();
   
      this.crudApi.getAll().subscribe(
        response =>{this.crudApi.listData = response;}
       );
      this.router.navigate(['/fournisseurs']);
    });
  }


}