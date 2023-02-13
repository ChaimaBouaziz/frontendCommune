import { Component } from '@angular/core';
import { Entre } from 'src/app/model/entre';
import { EntreService } from 'src/app/service/entre.service';
import { FournisseurService } from 'src/app/service/fournisseur.service';
import { Detailsoperation } from '../../model/detailsoperation';
import { DetailsoperationService } from 'src/app/service/detailsoperation.service';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AddDetailsoperationComponent } from '../../entre/add-detailsoperation/add-detailsoperation.component';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from "rxjs";
import { Fournisseur } from 'src/app/model/fournisseur';
import { TokenStorageService } from 'src/app/service/token-storage.service';
@Component({
  selector: 'app-add-entre',
  templateUrl: './add-entre.component.html',
  styleUrls: ['./add-entre.component.scss']
})
export class AddEntreComponent {
  FournisseurList: Fournisseur[];
  userCreation: number;
  userLastmodified: number;
  isValid: boolean = true;
  articleService: any;
  Date: any;

  fournisseur: any = {};

  constructor(public service: EntreService,
    public detailsoperationService: DetailsoperationService,
    private dialog: MatDialog, public fb: FormBuilder,
    public fournisseurService: FournisseurService,
    private toastr: ToastrService,
    private router: Router,
    private currentRoute: ActivatedRoute,
    private tokenStorage :TokenStorageService,
    private datePipe: DatePipe) { }
  get f() { return this.service.formData.controls }

  ngOnInit() {
    this.userCreation = this.tokenStorage.getUser().id;
    this.userLastmodified = this.tokenStorage.getUser().id;
    if (this.service.choixmenu == "A") {
      this.InfoForm();
      this.service.list = [];
      this.Date = this.transformDate(new Date(Date.now()));
    }
    else {
      this.detailsoperationService.getAll(this.service.formData.value.id).subscribe(
        response => {
          this.service.list = response;
          console.log("hi" + response);
        }
      );
    }


    this.fournisseurService.getAll().subscribe(
      response => {
        this.FournisseurList = response; console.log(response);
      }

    );

  }






  InfoForm() {
    this.service.formData = this.fb.group({
      id: null,
      totart: 0,
      qte: 0,
      idF: 0,
      nomF: '',
      dateOperation: new Date().toISOString().substring(0, 10),
      refOperation: '',
      numeroOperation: 0,
      detailsOperationsDTO: [],
      userCreation: this.userCreation,
      userLastmodified: this.userLastmodified,
    });
  }

  resetForm() {
    this.service.formData.reset();
  }

  AddData(index: any, Id: number) {
    
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "50%";
    dialogConfig.data = { operationId: this.service.formData.value.id };
    dialogConfig.data = { numeroOperation: this.service.formData.value.numeroOperation };
    dialogConfig.data = { index, Id };
   

    this.dialog.open(AddDetailsoperationComponent, dialogConfig).afterClosed().subscribe(b10 => {
    });
  }



  onDelete(item: Detailsoperation, Id: number, i: number) {
    if (Id != null)
      this.service.formData.value.id += Id;
    this.service.list.splice(i, 1);
  }

 
  validateForm() {
    this.isValid = true;

    if (this.service.formData.value.idF == 0)
      this.isValid = false;

    else if (this.service.list.length == 0)
      this.isValid = false;
    return this.isValid;
  }

  onSubmit() {
    if (this.service.choixmenu == "A")
    {
      this.f['detailsOperationsDTO'].setValue(this.service.list);
  
    this.service.saveOrUpdate(this.service.formData.value).
      subscribe(data => {
        
        this.toastr.success('Validation Faite avec Success');
        this.router.navigate(['/home/entres']);
      });
    }
    else {
    
      this.service.updatedata(this.service.formData.value.id,this.service.formData.value).subscribe(
        data => {
        
          this.toastr.success('Validation Faite avec Success');
        this.router.navigate(['/home/entres']);
      });
    }

  }

  transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
  OnSelectClient(ctrl: any) {
    if (ctrl.selectedIndex == 0) {
      this.f['nomF'].setValue('');
      this.f['idF'].setValue('');
    }
    else {
      this.f['nomF'].setValue(this.FournisseurList[ctrl.selectedIndex - 1].nom);
      this.f['idF'].setValue(this.FournisseurList[ctrl.selectedIndex - 1].id);
    }
  }

}