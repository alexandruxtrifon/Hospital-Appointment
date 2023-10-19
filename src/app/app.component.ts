import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { AddPacientComponent } from './add-pacient/add-pacient.component';
import { HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';
import { AppConfigComponent } from './app-config/app-config.component';


interface Appointment{
  nume: string;
  varsta: number;
  telefon: string;
  prioritate: number;
  statusprogramare: number;
  dataprogramare: Date;
  oraprogramare: string; //in js nu exista echivalentul la datatype time
  
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit{
  title = 'Hospital-Appointment';
  appointments: Appointment[] = [];
  constructor(private _dialog: MatDialog, private httpClient: HttpClient){}

  ngOnInit(){
    this.getAppointments();
  }
  openMatDialogProgramare(){
    this._dialog.open(AddAppointmentComponent);
  }
  openMatDialogPacient(){
    this._dialog.open(AddPacientComponent);
  }

  getAppointments(){
    this.httpClient
      .get<Appointment[]>('http://localhost:3000/api/get-appointment-data')
      .subscribe((data)=>{
        this.appointments=data;
      },
      (error)=>{
        console.error('Error fetching appointments:', error);
      });
  }

  openMatDialogConfig(){
    this._dialog.open(AppConfigComponent);
  }
}

