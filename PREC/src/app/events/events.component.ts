import { Component, OnInit } from '@angular/core';
import { eventDTO, eventsDTO } from '../models/events.model';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events:Array<eventDTO>;

  constructor(private service:EventsService) { }

  ngOnInit(): void {
    this.service.getEvents().then((res) => {
      this.events = res.events;
    });
  }

  deleteEvent(id:string){
    this.service.deleteEvent(id).then(res =>{
      this.service.getEvents().then((res) =>{
        this.events = res.events;
      })
    });
  }
}
