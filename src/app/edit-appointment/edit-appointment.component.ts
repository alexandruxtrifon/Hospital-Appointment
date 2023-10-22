import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-edit-appointment',
  templateUrl: './edit-appointment.component.html',
  styleUrls: ['./edit-appointment.component.css']
})
export class EditAppointmentComponent implements OnInit{
  selectedTime: string | null = null;
  timeSlots: string[] =[];

  constructor (public dialogRef: MatDialogRef<EditAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private http: HttpClient){}


  apiGetTimeSlots = 'http://localhost:3000/api/time-slots';
  ngOnInit(){
    //this.fetchAvailableTimeSlots(this.selectedDate)
  }
  onTimeSelected(event: any) {
    this.selectedTime = event;
  }
  onCancelClick(){

  }

  editClick(){

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
