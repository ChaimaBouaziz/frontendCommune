import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-dialog',
  template: `
    <h1 mat-dialog-title>Confirmation</h1>
    <div mat-dialog-content>{{ data.message }}</div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="true">Oui</button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button mat-button [mat-dialog-close]="false">Non</button>
    </div>
  `
})
export class ConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}