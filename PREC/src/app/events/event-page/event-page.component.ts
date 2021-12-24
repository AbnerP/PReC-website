import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { eventDTO } from 'src/app/models/events.model';
import { EventsService } from 'src/app/services/events.service';
import { stringToMultiLineArray } from 'src/app/utils';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
  id:string;
  event:eventDTO = {
    _id:'',
    name: '',
    date:new Date(),
    startTime:'',
    game:'',
    track:'',
    duration:'',
    description:'',
    contactInfo:'',
    imageURL:'',
  };

  description : Array<string>;

  constructor(private service:EventsService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.geteventByID(this.id).then(data => {
      this.event = data;
      this.description =  stringToMultiLineArray(this.event.description);
    });
  }

}
