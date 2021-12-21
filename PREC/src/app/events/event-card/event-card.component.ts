import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { eventDTO } from 'src/app/models/events.model';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent implements OnInit {

  @Input() event:eventDTO;

  constructor(private router:Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
  }
  redirect(){
    this.router.navigate([`id/${this.event._id}`], { relativeTo: this.route });
  }
}
