import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from "axios";
import { driverDTO, driversDTO } from '../models/driversDTO.model';
import { driverInfo } from '../models/drivers.model';
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
      driver.imageURL = environment.backendAPIURL + '/images/'+ driver.imageURL;
    }
    return res.data;
  }

  async getDriverByID(id:string){
    const res = await axios.get<driverDTO>(this.apiURL+`/${id}`);
    res.data.imageURL = environment.backendAPIURL + '/images/'+ res.data.imageURL;
    return res.data;
  }

  async updateDriver(id:string,driver:driverInfo,img:File){
    const token = localStorage.getItem("JWT")
    const jwt = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: jwt,
      }
    };

    const fd = new FormData();
    if(img != null){
      fd.append('image',img,img.name);
    }
    fd.append('name',driver.name);
    fd.append('gamertag',driver.gamertag);
    fd.append('kudosPrimeLink',driver.kudosPrimeLink);
    for(let role of driver.teamRole){
      fd.append('teamRole',role);
    }
    return await axios.patch(this.apiURL+`/${id}`,fd,config);
  }

  async deleteDriver(id:string){
    const token = localStorage.getItem("JWT")
    const jwt = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: jwt,
      }
    };
    const res = await axios.delete(this.apiURL+`/${id}`,config);
    console.log(res.data);
    return res.data;
  }

  async createDriver(driver:driverInfo,img:File){
    const token = localStorage.getItem("JWT")
    const jwt = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: jwt,
      }
    };

    const fd = new FormData();
    if(img != null){
      fd.append('image',img,img.name);
    }
    fd.append('name',driver.name);
    fd.append('gamertag',driver.gamertag);
    fd.append('kudosPrimeLink',driver.kudosPrimeLink);
    for(let role of driver.teamRole){
      fd.append('teamRole',role);
    }
    return await axios.post(this.apiURL,fd,config);
  }

}
