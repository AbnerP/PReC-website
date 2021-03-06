// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from "axios";
import { environment } from 'src/environments/environment';
import { eventCreationDTO, eventDTO, eventsDTO, registeredUserIDs } from '../models/events.model';
import { configureAuthorizationHeader } from '../utils';


@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  private apiURL = environment.backendAPIURL + '/events';

  async getEvents(){
    const res = await axios.get<eventsDTO>(this.apiURL);
    for(let event of res.data.events){
      event.imageURL = environment.backendAPIURL + '/images/'+ event.imageURL;
    }
    return res.data;
  }

  async getEventsLimit(limit:number){
    const res = await axios.get<eventsDTO>(this.apiURL  , { params: { limit: limit } });
    for(let event of res.data.events){
      event.imageURL = environment.backendAPIURL + '/images/'+ event.imageURL;
    }
    return res.data;
  }

  async geteventByID(id:string){
    const res = await axios.get<eventDTO>(this.apiURL+`/${id}`);
    res.data.imageURL = environment.backendAPIURL + '/images/'+ res.data.imageURL;
    return res.data;
  }

  async updateEvent(id:string,event:eventCreationDTO,img:File){
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
    const date = new Date(event.date).toJSON();
    fd.append('name',event.name);
    fd.append('date',date);
    fd.append('startTime',event.startTime);
    fd.append('game',event.game);
    fd.append('track',event.track);
    fd.append('duration',event.duration);
    fd.append('description',event.description);
    fd.append('contactInfo',event.contactInfo);
    fd.append('platform',event.platform);
    fd.append('registrationLimit',event.registrationLimit.toString());
    fd.append('host',event.host);

    return await axios.patch(this.apiURL+`/${id}`,fd,config);
  }

  async deleteEvent(id:string){
    const token = localStorage.getItem("JWT")
    const jwt = `Bearer ${token}`;
    const config = {
      headers: {
        Authorization: jwt,
      }
    };

    const res = await axios.delete(this.apiURL+`/${id}`,config);
    return res.data;
  }

  async createEvent(event:eventCreationDTO,img:File){
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
    fd.append('name',event.name);
    fd.append('date',event.date.toJSON());
    fd.append('startTime',event.startTime);
    fd.append('game',event.game);
    fd.append('track',event.track);
    fd.append('duration',event.duration);
    fd.append('description',event.description);
    fd.append('contactInfo',event.contactInfo);
    fd.append('platform',event.platform);
    fd.append('registrationLimit',event.registrationLimit.toString());
    fd.append('host',event.host);

    return await axios.post(this.apiURL,fd,config);
  }

  async getRegisteredUsers(id:string){
    let i = 0;
    while(true){
      const res = await axios.get<registeredUserIDs>(this.apiURL+`/users/${id}`);
      if(res.data.users.length == res.data.count || i === 5){
        return res.data;
      }
      i++;
    }
  }

  async registerToEvent(eventId:string,userId:string){
    const config =configureAuthorizationHeader();
    const res = await axios.patch(this.apiURL+`/register/${userId}?eventId=${eventId}`,{},config);
    return res.data;
  }

  async withdrawFromEvent(eventId:string,userId:string){
    const config = configureAuthorizationHeader();
    const res = await axios.patch(this.apiURL+`/withdraw/${userId}?eventId=${eventId}`,{},config);
    return res.data;
  }

}
