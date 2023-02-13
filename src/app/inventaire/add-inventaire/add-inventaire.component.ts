import { Component } from '@angular/core';
import { Inventaire } from 'src/app/model/inventaire';
import { InventaireService } from 'src/app/service/inventaire.service';
import { Linventaire} from '../../model/linventaire';
import { LinventaireService } from 'src/app/service/linventaire.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule,Validators }
from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog';
import{AddLinventaireComponent} from '../../inventaire/add-linventaire/add-linventaire.component';
import { Router, ActivatedRoute  } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from "rxjs";
import { TokenStorageService } from 'src/app/service/token-storage.service';
@Component({
  selector: 'app-add-inventaire',
  templateUrl: './add-inventaire.component.html',
  styleUrls: ['./add-inventaire.component.scss']
})
export class AddInventaireComponent {

  userCreation: number;
  userLastmodified: number;
  isValid:boolean = true;
  articleService: any;
  Date:any;
  constructor(public service:InventaireService,
    public linventaireService:LinventaireService,
    private dialog:MatDialog,public fb: FormBuilder,
    private toastr :ToastrService,
    private router :Router,
    private currentRoute: ActivatedRoute,
    private tokenStorage :TokenStorageService,
    private datePipe : DatePipe) { }
    get f() { return this.service.formData.controls }
  
    ngOnInit() {

      if (this.service.choixmenu == "A"){
       this.InfoForm();
       this.service.list = [];
       this.Date = this.transformDate(new Date(Date.now()));
      
       }
         else
       {
       this.linventaireService.getAll(this.service.formData.value.id).subscribe(
        response =>{this.service.list = response}
        );
        this.f['dateInventaire'].setValue(this.service.formData.value.dateInventaire);

       }
   
 
     } 
   InfoForm() {
       this.service.formData = this.fb.group({
         id :null,
         dateInventaire  : new Date().toISOString().substring(0, 10),
         numInventaire : '',
         linvents:[],
         });
       } 
     
   resetForm() {
         this.service.formData.reset();
     }
   
   AddData(linventaireIndex:any,Id:any){  
       const dialogConfig = new MatDialogConfig();
       dialogConfig.autoFocus = true;
       dialogConfig.disableClose = true;
       dialogConfig.width="50%";
       dialogConfig.data = {inventId: this.service.formData.value.id};
       dialogConfig.data={linventaireIndex,Id};
       this.dialog.open(AddLinventaireComponent, dialogConfig).afterClosed().subscribe(b10=>{
       });
     }
   
     
   onDelete(item : Linventaire,Id:number,i:number){
       if(Id != null)
       this.service.formData.value.id+=Id ;
      this.service.list.splice(i,1);

      }
   

      
   
   
   validateForm(){
        this.isValid = true ;
       
        if(this.service.formData.value.id==0)
        this.isValid =false;
       
        else if (this.service.list.length==0)
        this.isValid =false;
        return this.isValid;
      }
   
      onSubmit(){
        if (this.service.choixmenu == "A")
        {
          this.f['linvents'].setValue(this.service.list);
      
        this.service.saveOrUpdate(this.service.formData.value).
          subscribe(data => {
            
            this.toastr.success('Validation Faite avec Success');
            this.router.navigate(['/home/inventaires']);
          });
        }
        else {
         
          this.service.updatedata(this.service.formData.value.id,this.service.formData.value).subscribe(
            data => {
            
              this.toastr.success('Validation Faite avec Success');
            this.router.navigate(['/home/inventaires']);
          });
        }
    
       }
    
     
   transformDate(date:any){
        return this.datePipe.transform(date, 'dd-MM-yyyy');
      }
      
   
   }