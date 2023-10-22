import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent {
  selectedTime: string | null = null;
  timeSlots: string[] =[];

  constructor (public dialogRef: MatDialogRef<EditAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient){}
  onTimeSelected(event: any) {
    this.selectedTime = event;
  }
  onCancelClick(){

  }

  editClick(){

  }
}
