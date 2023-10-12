import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-pacient',
  templateUrl: './add-pacient.component.html',
  styleUrls: ['./add-pacient.component.css']
})
export class AddPacientComponent {
  patientData: any = {
    nume: '',
    varsta: null,
    telefon: '',
  };

  constructor(
    public dialogRef: MatDialogRef<AddPacientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }
  onSaveClick(): void {
    this.dialogRef.close(this.patientData);
  }
}
