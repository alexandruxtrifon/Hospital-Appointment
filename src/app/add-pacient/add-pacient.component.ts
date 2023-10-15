import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

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

  apiSavePatientUrl = 'http://localhost:3000/api/save-patient';


  constructor(
    public dialogRef: MatDialogRef<AddPacientComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.http.post(this.apiSavePatientUrl, this.patientData).subscribe(
      (response) =>{
      console.log(response);
      this.dialogRef.close();
    },
    (error) => {
      console.error(error);
    }
    //this.dialogRef.close(this.patientData);
    );
  }
}
