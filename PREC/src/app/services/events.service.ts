// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from "axios";
import { environment } from 'src/environments/environment';
import { eventCreationDTO, eventDTO, eventsDTO } from '../models/events.model';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  private apiURL = environment.backendAPIURL + '/events';

  async getEvents(){
    const res = await axios.get<eventsDTO>(this.apiURL);
    for(let event of res.data.events){
      event.imageURL = environment.backendAPIURL + '/'+ event.imageURL;
    }
    return res.data;
  }

  async geteventByID(id:string){
    const res = await axios.get<eventDTO>(this.apiURL+`/${id}`);
    res.data.imageURL = environment.backendAPIURL + '/'+ res.data.imageURL;
    return res.data;
  }

  async updateEventImage(id:string,img:string){
    const res = await axios.patch(this.apiURL+`/${id}`,{imageURL:img});
    console.log(res.data);
    return res.data;
  }

  async deleteEvent(id:string){
    const res = await axios.delete(this.apiURL+`/${id}`);
    console.log(res.data);
    return res.data;
  }

  async createEvent(event:eventCreationDTO,img:File){
    const fd = new FormData();
    if(img != null){
      fd.append('eventImage',img,img.name);
    }
    fd.append('name',event.name);
    fd.append('date',event.date.toJSON());
    fd.append('startTime',event.startTime);
    fd.append('game',event.game);
    fd.append('track',event.track);
    fd.append('duration',event.duration);
    fd.append('description',event.description);
    fd.append('contactInfo',event.contactInfo);

    return await axios.post(this.apiURL,fd);
  }
}
