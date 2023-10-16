import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private apiUrl = 'http://localhost:3000/api/get-config';
  constructor(private http: HttpClient) { }

  getConfig(){
    return this.http.get(this.apiUrl);
  }
}
