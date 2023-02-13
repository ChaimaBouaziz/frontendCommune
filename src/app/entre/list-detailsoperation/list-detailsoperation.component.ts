import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { EntreService } from '../../service/entre.service';
import { Entre } from '../../model/entre';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogConfig, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators }
  from '@angular/forms';
import { DetailsoperationDTO } from 'src/app/model/detailsoperation-dto';

@Component({
  selector: 'app-list-detailsoperation',
  templateUrl: './list-detailsoperation.component.html',
  styleUrls: ['./list-detailsoperation.component.scss']
})
export class ListDetailsoperationComponent {
  p: number = 1;
  entreListe: any;
  SearchText: string;
  constructor(private service: EntreService, private router: Router,
    private toastr: ToastrService, public fb: FormBuilder,
    private datePipe: DatePipe) { }
  ngOnInit() {

    this.refreshListe();

  }
  refreshListe() {
    this.service.getAll().subscribe(
      response => { this.entreListe = response; }
    );

  }

  openForEdit(Id: number) {
    this.router.navigate(['/entres/modification/' + Id]);
    this.toastr.info ("open for edit");
  }

  removeData(id: number) {

  }

  onCommandeDelete(id: number) {

  }
  

  selectCommande(item: DetailsoperationDTO) {
    this.service.formData = this.fb.group(Object.assign({}, item));
    this.toastr.info ("selct commande");
    this.router.navigate(['/home/entre']);
  }
  transformDate(date: any) {
    return this.datePipe.transform(date, 'yyyy-MM-dd');
  }
}
