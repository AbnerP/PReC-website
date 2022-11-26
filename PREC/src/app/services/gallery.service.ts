import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import axios from "axios";
import { driverDTO, driversDTO } from '../models/driversDTO.model';
import { driverInfo } from '../models/drivers.model';
import { HttpClient } from '@angular/common/http';
import { galleryDTO, sectionsDTO } from '../models/galleryDTO.model';
import { DomSanitizer } from '@angular/platform-browser';
@Injectable({
  providedIn: 'root'
})
export class GalleryService {

  constructor(private http:HttpClient,
    private _sanitizer: DomSanitizer) { }

  private apiURL = environment.backendAPIURL + '/gallery';

  async getImages(){
    const res = await axios.get<galleryDTO>(this.apiURL);
    for(let image of res.data.images){
      image.imageURL = environment.backendAPIURL + '/images/'+ image.imageURL;
    }
    return res.data;
  }

  async getGalleryLayout(){
    const {data} = await axios.get<sectionsDTO>(this.apiURL+"/layout");
    this.updateImagesURL(data.sections);
    return data;
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

  async addImage(img:File){
    const token = localStorage.getItem("JWT")
    const jwt = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: jwt,
      }
    };

    const fd = new FormData();
    if(img == null){
      return null;
    }
    fd.append('image',img,img.name);
    return await axios.post(this.apiURL,fd,config);
  }
  
  updateImagesURL(sections){
    sections.sort((a,b)=>{return a.position - b.position});
    for (let section of sections){
      section.media.sort((a,b)=>{return a.position - b.position})
      for (let m of section.media){
        if(m.type === "image"){
          m.sourceURL = environment.backendAPIURL + '/images/'+ m.sourceURL;
        }
        // if(m.type === "video"){
        //   m.sourceURL = this._sanitizer.bypassSecurityTrustResourceUrl(m.sourceURL);
        // }
      }
    }
  }

}
