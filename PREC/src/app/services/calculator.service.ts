import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { strategy } from '../Models/strategy.model';
import { Telemetry } from '../Models/tiretelemetry.model';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http:HttpClient) { }

  private apiURL = environment.apiURL + '/calculator';

  post(data:Telemetry){
    // let params = new HttpParams();
    // params = params.append('coin',coin);
    return this.http.post<Telemetry>(this.apiURL,data);
    // return r;
    // return this.http.get<strategy>(this.apiURL);
  }
}
