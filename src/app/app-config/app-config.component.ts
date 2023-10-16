import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from './config.service';

interface Config{
  durataprogramare: number;
}

@Component({
  selector: 'app-app-config',
  templateUrl: './app-config.component.html',
  styleUrls: ['./app-config.component.css']
})
export class AppConfigComponent implements OnInit{
  //durataprogramare!: number;
  durata: Config[] = [];
  constructor(
    public dialogRef: MatDialogRef<AppConfigComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private httpClient: HttpClient,
    private configService: ConfigService
  ) {}

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {

  }

  ngOnInit(){
    this.getDurata()
    };
  

  getDurata(){
    this.httpClient
    .get<Config[]>('http://localhost:3000/api/get-config')
    .subscribe((data)=>{
      this.durata=data;
    },
    (error)=>{
      console.error('Error fetching appointments:', error);
    });
  }
}
