import { Component, Input, OnInit } from '@angular/core';
import { eventDTO } from 'src/app/models/events.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input() event:eventDTO;

  constructor() { }

  ngOnInit(): void {
  }

}
