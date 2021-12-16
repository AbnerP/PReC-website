import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from "axios";
import { driversDTO } from '../models/driverInterfaces/driversDTO.model';
import { driverInfo } from '../models/driverInterfaces/drivers.model';
@Injectable({
  providedIn: 'root'
})
export class DriversService {

  constructor() { }

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

  async createDriver(driver:driverInfo){
    console.log(driver);
    const res = await axios.post<driverInfo>(this.apiURL,driver);
    console.log(res.data);
    return res.data;
  }

}
