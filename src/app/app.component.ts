import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddAppointmentComponent } from './add-appointment/add-appointment.component';
import { AddPacientComponent } from './add-pacient/add-pacient.component';
import { HttpClient } from '@angular/common/http';
import { Time } from '@angular/common';
import { AppConfigComponent } from './app-config/app-config.component';
import { MatTableDataSource } from '@angular/material/table';
import {CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';


interface Appointment{
  codprogramare: number;
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
  constructor(private _dialog: MatDialog, 
    private httpClient: HttpClient,
    private _snackBar: MatSnackBar){}

    selectedDate: Date = new Date();

  ngOnInit(){
    this.getAppointments();
  }
  openMatDialogProgramare(){
    this._dialog.open(AddAppointmentComponent);
  }
  openMatDialogPacient(){
    this._dialog.open(AddPacientComponent);
  }

  oldgetAppointments(){
    this.httpClient
    .get<Appointment[]>('http://localhost:3000/api/get-appointment-data')
      .subscribe((data)=>{
        this.appointments=data;
      },
      (error)=>{
        console.error('Error fetching appointments:', error);
      });
  }  
  getAppointments(){
    this.httpClient
    //.get<Appointment[]>('http://localhost:3000/api/get-appointment-data') // --- DEV
    .get<Appointment[]>('http://localhost:3000/api/get-appointments/today')  //--- FINAL
      .subscribe((data)=>{
        this.dataSource.data=data;
      },
      (error)=>{
        console.error('Error fetching appointments:', error);
      });
  }

  openMatDialogConfig(){
    this._dialog.open(AppConfigComponent);
  }

  dataSource: MatTableDataSource<Appointment> = new MatTableDataSource<Appointment>([]);
  displayedColumns: string[] = ['nume', 'varsta', 'telefon', 'dataprogramare', 'oraprogramare', 'statusprogramare', 'prioritate', 'actions', 'modify'];
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.displayedColumns, event.previousIndex, event.currentIndex);
  }

  onPreiaClick(appointment: Appointment) {
    const patientName = appointment.nume;

    if (appointment.statusprogramare === 1) {
      this.httpClient.patch<any>(`http://localhost:3000/api/update-statusprogramare/1/${appointment.codprogramare}`, null)
        .subscribe((response) => {
          if (response.success) {
            appointment.statusprogramare = 2;
            this.fetchUpdatedData();
            this._snackBar.open(`Pacientul ${patientName} a fost preluat`, 'Inchide', {duration: 3000});
          } else {
            console.error('Error updating Programare Status');
          }
        },
        (error) => {
          console.error('Error updating Programare Status:', error);
        });
    } else if (appointment.statusprogramare === 2) {
      this.httpClient.patch<any>(`http://localhost:3000/api/update-statusprogramare/2/${appointment.codprogramare}`, null)
        .subscribe((response) => {
          if (response.success) {
            appointment.statusprogramare = 3;
            this.fetchUpdatedData();
            this._snackBar.open(`Programarea pacientului ${patientName} a fost finalizata`, 'Inchide', {duration: 3000});
          } else {
            console.error('Error updating Programare Status');
          }
        },
        (error) => {
          console.error('Error updating Programare Status:', error);
        });  
    }
    console.log('Status Programare')
  }

  fetchUpdatedData() {
    this.httpClient
    .get<Appointment[]>('http://localhost:3000/api/get-appointment-data')
    .subscribe((data) => {
      this.dataSource.data = data;
    },
    (error) => {
      console.error('Error fetching appointments:', error);
    });
  }

  fetchAppointmentsByDate() {
    const formattedDate = this.formatDate(this.selectedDate);
    this.httpClient.get<Appointment[]>(`http://localhost:3000/api/get-appointments/${formattedDate}`)
      .subscribe((data) => {
        this.dataSource.data = data;
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      });
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month= String(date.getMonth()+1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2,'0');
    return `${year}-${month}-${day}`;
  }
}
