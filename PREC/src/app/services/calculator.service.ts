import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { strategy } from '../Models/strategy.model';
import { Telemetry } from '../Models/tiretelemetry.model';
import axios from "axios";
@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http:HttpClient) { }

  private apiURL = environment.apiURL + '/calculator';

  async post(data:Telemetry){
    const res = await axios.post<strategy>(this.apiURL, data);
    return res.data;
  }
}
