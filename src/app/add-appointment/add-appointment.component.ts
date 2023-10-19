import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

interface Patient{
  nume: string;
  varsta: number;
  telefon: string;
}
export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  },

};

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS} ]
})

export class AddAppointmentComponent implements OnInit {

  //timeSlots: string[] = [];
  timeSlots: string[] =[];

  //names: string[]=[];
  names: Patient[] = [];
  selectedName: string | undefined;

  selectedAge: number | null = null;
  selectedPhone: string | null = null;
  //selectedPatient: any = {varsta: null, telefon: null};
  selectedDate: Date | null = null;
  selectedTime: string | null = null;

  constructor (public dialogRef: MatDialogRef<AddAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient){}

  apiGetNames = 'http://localhost:3000/api/get-patient-data';
  apiGetTimeSlots = 'http://localhost:3000/api/time-slots';
  ngOnInit(){
    this.http.get<any[]>(this.apiGetNames)
    .subscribe((data) =>{
      this.names = data.map(item => item.nume);
    },
    (error) =>{
      console.error('Error fetching patient data:', error);   
    });
    // am aici o idee

    this.http.get<string[]>(this.apiGetTimeSlots).subscribe(data =>{
      this.timeSlots = data;
    })
  }
  apiPostAppointment = 'http://localhost:3000/api/post-appointment';

  onProgrameazaClick(){
    const appointmentData = {
      Nume: this.selectedName,
      DataProgramare: this.selectedDate,
      OraProgramare: this.selectedTime,
    };
  

  this.http.post(this.apiPostAppointment, appointmentData)
  .subscribe((response) => {
    console.log('Appointment added successfully:', response);
    this.dialogRef.close();
  },
  (error) => {
    console.error('Error adding appointment:', error);
  }
  );
  }
  onTimeSelected(event: any) {
    this.selectedTime = event;
  }
}
