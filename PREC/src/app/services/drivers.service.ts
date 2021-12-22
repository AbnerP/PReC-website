import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from "axios";
import { driverDTO, driversDTO } from '../models/driverInterfaces/driversDTO.model';
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
    for(let driver of res.data.drivers){
      driver.imageURL = environment.backendAPIURL + '/'+ driver.imageURL;
    }
    return res.data;
  }

  async getDriverByID(id:string){
    const res = await axios.get<driverDTO>(this.apiURL+`/${id}`);
    res.data.imageURL = environment.backendAPIURL + '/'+ res.data.imageURL;
    return res.data;
  }

  async updateDriver(id:string,driver:driverInfo,img:File){
    const fd = new FormData();
    if(img != null){
      fd.append('driverImage',img,img.name);
    }
    fd.append('name',driver.name);
    fd.append('gamertag',driver.gamertag);
    fd.append('kudosPrimeLink',driver.kudosPrimeLink);
    for(let role of driver.teamRole){
      fd.append('teamRole',role);
    }
    return await axios.patch(this.apiURL+`/${id}`,fd);
  }

  async deleteDriver(id:string){
    const res = await axios.delete(this.apiURL+`/${id}`);
    console.log(res.data);
    return res.data;
  }

  async createDriver(driver:driverInfo,img:File){
    const fd = new FormData();
    if(img != null){
      fd.append('driverImage',img,img.name);
    }
    fd.append('name',driver.name);
    fd.append('gamertag',driver.gamertag);
    fd.append('kudosPrimeLink',driver.kudosPrimeLink);
    for(let role of driver.teamRole){
      fd.append('teamRole',role);
    }
    return await axios.post(this.apiURL,fd);
  }

}
