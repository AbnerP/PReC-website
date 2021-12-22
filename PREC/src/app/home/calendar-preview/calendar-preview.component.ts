import { Component, OnInit } from '@angular/core';
import { eventDTO, eventsDTO } from 'src/app/models/events.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-calendar-preview',
  templateUrl: './calendar-preview.component.html',
  styleUrls: ['./calendar-preview.component.scss']
})
export class CalendarPreviewComponent implements OnInit {

  events:Array<eventDTO>;

  constructor(private service:EventsService) { }

  ngOnInit() {
    this.service.getEventsLimit(3).then(res =>{
      this.events = res.events;
    });
  }
}
