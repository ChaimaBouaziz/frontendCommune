import { Component, OnInit,Inject} from '@angular/core';
import { DepartementService} from '../../service/departement.service'
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }from '@angular/forms';
import { Router } from '@angular/router';
import { Departement} from '../../model/departement';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatDialogRef } from "@angular/material/dialog";
import { TokenStorageService } from 'src/app/service/token-storage.service';
@Component({
  selector: 'app-add-departement',
  templateUrl: './add-departement.component.html',
  styleUrls: ['./add-departement.component.scss']
})
export class AddDepartementComponent {
  userCreation: number;
  userLastmodified: number;
  constructor(public crudApi: DepartementService ,public fb: FormBuilder,public toastr: ToastrService,
    private router : Router, @Inject(MAT_DIALOG_DATA)  public data:any,
    public dialogRef:MatDialogRef<AddDepartementComponent>,private tokenStorage :TokenStorageService
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
        libDep: ['', [Validators.required]],
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
    this.router.navigate(['/departements']); 
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
      this.router.navigate(['/departements']);
    });
  }


}