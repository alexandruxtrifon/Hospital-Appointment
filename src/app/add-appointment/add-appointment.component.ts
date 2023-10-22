import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DateTime } from 'luxon';


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
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS}]
})

export class AddAppointmentComponent implements OnInit {

  //timeSlots: string[] = [];
  timeSlots: string[] =[];

  selectedPriority: number[]=[];
  statusProgramare: number = 1;
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

    this.http.get<string[]>(this.apiGetTimeSlots).subscribe(data =>{
      this.timeSlots = data;
    
    
    });
}
  
  apiPostAppointment = 'http://localhost:3000/api/post-appointment';

  onProgrameazaClick(){
    if(this.selectedDate){
    const formattedDate = this.formatDate(this.selectedDate);
   // const parsedPriority = parseInt(this.selectedPriority, 10);
    const appointmentData = {
      Nume: this.selectedName,
      DataProgramare: formattedDate,
      OraProgramare: this.selectedTime,
      Prioritate: this.selectedPriority,
      StatusProgramare: this.statusProgramare
    };
    console.log(appointmentData);
  

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
}
  onTimeSelected(event: any) {
    this.selectedTime = event;
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  fetchAvailableTimeSlots(selectedDate: Date | null) {
    if(selectedDate){
      const formattedDate = this.formatDate(selectedDate);
      this.http.get<string[]>(`http://localhost:3000/api/time-slots/${formattedDate}`)
        .subscribe(data => {
          this.timeSlots = data;
        }, error => {
          console.error('error fetching available time slots:', error)
        });
    }
  }
  formatDate(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
