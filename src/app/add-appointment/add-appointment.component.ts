import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Name {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.css']
})

export class AddAppointmentComponent implements OnInit {
  //names: Name[]= [
  //  {value: 'nume-1', viewValue: 'Nume'},
  //  {value: 'nume-2', viewValue: 'Nume2'}
  //];
  names: string[] = [];

  constructor (private http: HttpClient){}

  ngOnInit(){
    this.http.get<string[]>('api/get/patient-names').subscribe((data) => {
      this.names=data;
    })
  }
}
