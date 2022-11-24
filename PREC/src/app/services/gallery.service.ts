import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from "axios";
import { driverDTO, driversDTO } from '../models/driversDTO.model';
import { driverInfo } from '../models/drivers.model';
import { HttpClient } from '@angular/common/http';
import { galleryDTO } from '../models/galleryDTO.model';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http:HttpClient) { }

  private apiURL = environment.backendAPIURL + '/gallery';

  async getImages(){
    const res = await axios.get<galleryDTO>(this.apiURL);
    for(let image of res.data.images){
      image.imageURL = environment.backendAPIURL + '/images/'+ image.imageURL;
    }
    return res.data;
  }

  async deleteImage(id:string){
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

  async addImage(driver:driverInfo, img:File){
    const token = localStorage.getItem("JWT")
    const jwt = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: jwt,
      }
    };

    const fd = new FormData();
    if(img != null){
      return null;
    }
    fd.append('image',img,img.name);
    return await axios.post(this.apiURL,fd,config);
  }

}
