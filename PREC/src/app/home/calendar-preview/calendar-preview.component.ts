import { Component, Input, OnInit } from '@angular/core';
import { eventDTO, eventsDTO } from 'src/app/models/events.model';
import { EventsService } from 'src/app/services/events.service';

@Component({
  selector: 'app-calendar-preview',
  templateUrl: './calendar-preview.component.html',
  styleUrls: ['./calendar-preview.component.scss']
})
export class CalendarPreviewComponent implements OnInit {

  @Input() events:Array<eventDTO>;

  constructor(private service:EventsService) { }

  ngOnInit() {}
}
