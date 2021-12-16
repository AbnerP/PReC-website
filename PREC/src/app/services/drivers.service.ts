import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from "axios";
import { driversDTO } from '../models/driverInterfaces/driversDTO.model';
import { driverInfo } from '../models/driverInterfaces/drivers.model';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor(private http:HttpClient) { }

  private apiURL = environment.backendAPIURL + '/drivers';

  async getDrivers(){
    const res = await axios.get<driversDTO>(this.apiURL);
    console.log(res.data);
    return res.data;
  }

  async getDriverByID(id:string){
    const res = await axios.get<driversDTO>(this.apiURL+`/${id}`);
    console.log(res.data);
    return res.data;
  }

  async updateDriverImage(id:string,img:string){
    const res = await axios.patch(this.apiURL+`/${id}`,{imageURL:img});
    console.log(res.data);
    return res.data;
  }

  async deleteDriver(id:string){
    const res = await axios.delete(this.apiURL+`/${id}`);
    console.log(res.data);
    return res.data;
  }

  async createDriver(driver:driverInfo,img:File){
    const fd = new FormData();
    fd.append('driverImage',img,img.name);
    fd.append('name',driver.name);
    // fd.append('teamRole',driver.teamRole);
    fd.append('gamertag',driver.gamertag);
    fd.append('kudosPrimeLink',driver.kudosPrimeLink);
    for(let role of driver.teamRole){
      fd.append('teamRole',role);
    }
    this.http.post(this.apiURL,fd)
      .subscribe(res => {
        console.log(res);
      });
    // const res = await axios.post<driverInfo>(this.apiURL,driver);
    // console.log(res.data);
    // return res.data;
  }

}
