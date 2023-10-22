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
import { MatSort } from '@angular/material/sort';
import { ViewChild } from '@angular/core';
import { EditAppointmentComponent } from './edit-appointment/edit-appointment.component';
import { Sort, MatSortModule} from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
interface Appointment{
  codprogramare: number;
  nume: string;
  varsta: number;
  telefon: string;
  prioritate: number;
  statusprogramare: number;
  dataprogramare: Date;
  oraprogramare: string;
  
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
    private _snackBar: MatSnackBar,
    private _liveAnnouncer: LiveAnnouncer){}
    selectedDate: Date = new Date();
    public tableData: any[] = [];
    @ViewChild(MatSort) sort!: MatSort;


  ngOnInit(){
    this.getAppointments();
    //this.dataSource.sort = this.sort;
    //this.sort.active= 'oraprogramare';
    //this.sort.direction= 'asc';
    this.sortTable();
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openMatDialogProgramare(){
    this._dialog.open(AddAppointmentComponent);
  }
  openMatDialogPacient(){
    this._dialog.open(AddPacientComponent);
  }
  
  openMatDialogModifica(){
    const dialogRef = this._dialog.open(EditAppointmentComponent, {
    });
  
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
      this.sortTableByOraAscending();
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
    this.fetchAppointmentsByDate()
  }

  cancelAppointment(appointment: Appointment){
    this.httpClient.patch<any>(`http://localhost:3000/api/update-programare-time/${appointment.codprogramare}`, null)
    .subscribe((response) => {
      if (response.success){
        appointment.statusprogramare = 4;
        this.fetchUpdatedData();
        this._snackBar.open(`Programarea pacientului ${appointment.nume} a fost anulata`, 'Inchide', {duration: 3000});
      } else {
        console.error('error canceling programare');
      }
    },
    (error) => {
      console.error('error canceling appointment:', error);
    });
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
    const month = String(date.getMonth() + 1).padStart(2,'0');
    const day = String(date.getDate()).padStart(2,'0');
    return `${year}-${month}-${day}`;
  }

  sortTableByOraAscending() {
    this.dataSource.data = this.dataSource.data.sort((a, b) => {
      const oraA = a.oraprogramare;
      const oraB = b.oraprogramare;
      return oraA.localeCompare(oraB);
    });


    this.dataSource.sort = this.sort;
  }
  sortTable() {
    const data = this.dataSource.data;
    data.sort((a, b) => {
      const oraA = a.oraprogramare;
      const oraB = b.oraprogramare;
      return oraA.localeCompare(oraB);
    });
    this.dataSource.data = data;

  }
  apiDelete = 'http://localhost:3000/api/delete-rearrange';
  ordoneazaReprogrameaza() {
    if (this.dataSource) {
      this.tableData = this.dataSource.data.sort((a,b)=>a.prioritate - b.prioritate).map((appointment: any) => ({
        name: appointment.nume,
        age: appointment.varsta,
        appointmentDate: appointment.dataprogramare,
        appointmentTime: appointment.oraprogramare.substring(0, 5),
        status: this.getStatusLabel(appointment.statusprogramare),
        priority: appointment.prioritate,
      }));
      console.log(this.tableData);
      const formattedDate = this.formatDate(this.selectedDate);
      //this.httpClient.delete<Appointment[]>(this.apiDelete, formattedDate)
    }
  }
  getStatusLabel(status: number): number {
    switch (status) {
      case 1:
        return 1;
      case 2:
        return 2;
      case 3:
        return 3;
      case 4:
        return 4;
      default:
        return 0;
    }
  }
}
