import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { AddPacientComponent } from './add-pacient/add-pacient.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Hospital-Appointment';
  constructor(private _dialog: MatDialog){}

  openMatDialogProgramare(){
    this._dialog.open(AddAppointmentComponent);
  }
  openMatDialogPacient(){
    this._dialog.open(AddPacientComponent)
  }
}
