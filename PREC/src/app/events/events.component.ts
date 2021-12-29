import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { eventDTO, eventsDTO } from '../models/events.model';
import { EventsService } from '../services/events.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss']
})
export class EventsComponent implements OnInit {

  events:Array<eventDTO>;

  constructor(private service:EventsService,
    private router:Router,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
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

  editEvent(id:string){
    this.router.navigate([`update/${id}`], { relativeTo: this.route });
  }
}
