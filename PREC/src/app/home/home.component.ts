import { Component, OnInit } from '@angular/core';
import { EventsService } from 'src/app/services/events.service';
import { eventDTO } from '../models/events.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  events:Array<eventDTO>;
  
  constructor(private service:EventsService) { }

  ngOnInit() {
    window.scrollTo(0, 0);
    this.service.getEventsLimit(2).then(res =>{
      this.events = res.events;
    });
  }

}
