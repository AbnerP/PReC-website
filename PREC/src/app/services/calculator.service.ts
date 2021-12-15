import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { strategy } from '../models/calculatorInterfaces/strategy.model';
import { Telemetry } from '../models/calculatorInterfaces/tiretelemetry.model';
import axios from "axios";
@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http:HttpClient) { }

  private apiURL = environment.calculatorApiURL + '/calculator';

  async post(data:Telemetry, laps:number, pitLoss:number){
    const res = await axios.post<strategy>(this.apiURL, data, { params: { laps: laps, pitLoss:pitLoss } });
    return res.data;
  }
}
