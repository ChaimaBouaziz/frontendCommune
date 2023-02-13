import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Departement } from 'src/app/model/departement';
import { DepartementService } from 'src/app/service/departement.service';
import { EmployeService } from 'src/app/service/employe.service';
import { TokenStorageService } from 'src/app/service/token-storage.service';
@Component({
  selector: 'app-add-employe',
  templateUrl: './add-employe.component.html',
  styleUrls: ['./add-employe.component.scss']
})
export class AddEmployeComponent {
  userCreation: number;
  userLastmodified: number;
  DepartementList: Departement[];
  departement: any = {};
  constructor(public crudApi: EmployeService ,public fb: FormBuilder,public toastr: ToastrService,
  
    public DepartementService: DepartementService,
    private router : Router,@Inject(MAT_DIALOG_DATA)  public data:any,
    public dialogRef:MatDialogRef<AddEmployeComponent>,private tokenStorage :TokenStorageService
    
    ) { }
    get f() { return this.crudApi.dataForm.controls; }
  ngOnInit() {
    this.userCreation = this.tokenStorage.getUser().id;
    this.userLastmodified = this.tokenStorage.getUser().id;
   if (this.crudApi.choixmenu == "A")
    {this.infoForm()};
    this.DepartementService.getAll().subscribe(
      response =>{this.DepartementList = response;}
     );

   }
  
  infoForm() {
    this.crudApi.dataForm = this.fb.group({
        id: null,
        nom: ['', [Validators.required]],
        prenom: ['', [Validators.required]],
        dateEmbauche: [0, [Validators.required]],
        mail: ['', [Validators.required]],
      
        idDep: [0, [Validators.required]],
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
onSelectedDep(libDep: number)
{
 this.DepartementService.getData(libDep).subscribe(
    response =>{
    this.departement =response;

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
    this.router.navigate(['/employes']); 
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
      this.router.navigate(['/employes']); 
    });
  }

  
}