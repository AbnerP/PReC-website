import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { strategy } from '../Models/strategy.model';

@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  constructor(private http:HttpClient) { }

  private apiURL = environment.apiURL + '/calculator';

  get(){
    // let params = new HttpParams();
    // params = params.append('coin',coin);
    return this.http.get<strategy>(this.apiURL);
    // return r;
    // return this.http.get<strategy>(this.apiURL);
  }
}
