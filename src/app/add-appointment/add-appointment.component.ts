import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';

interface Names{
  nume: string;
}
@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})

export class AddAppointmentComponent implements OnInit {

  timeSlots: string[] = [];
  //patientNames: any = {
  //  nume: ''
  //};
  names: string[]=[];
  selectedName: string | undefined;
  constructor (public dialogRef: MatDialogRef<AddAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient){}

  apiGetNames = 'http://localhost:3000/api/get-patient-data';
  apiGetTimeSlots = 'http://localhost:3000/api/time-slots';
  ngOnInit(){
    //this.http.get<string[]>(this.apiGetNames)
    //.subscribe((data) => {
    //  this.names=data;
    //},
    //(error) => {
    //  console.error('Error fetching patient names:', error);
    //});
    this.http.get<any[]>(this.apiGetNames)
    .subscribe((data) =>{
      this.names = data.map(item => item.nume);
    },
    (error) =>{
      console.error('Error fetching patient names:', error);   
    });

    this.http.get<string[]>(this.apiGetTimeSlots).subscribe(data =>{
      this.timeSlots = data;
    })
  }
}