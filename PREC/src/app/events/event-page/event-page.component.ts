import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { eventDTO } from 'src/app/models/events.model';
import { EventsService } from 'src/app/services/events.service';
import { SecurityService } from 'src/app/services/users.service';
import { getFieldFromJWT, stringToMultiLineArray } from 'src/app/utils';

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
    numberRegisteredUsers:'',
    platform:'',
    registrationLimit:0,
    host:'',
  };

  description : Array<string>;
  userPlatforms:string[] = [];
  registeredUserIDs:string[] = [];
  userId:string = getFieldFromJWT("userId");

  constructor(private service:EventsService,
    private userService:SecurityService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.geteventByID(this.id).then(data => {
      this.event = data;
      this.description =  stringToMultiLineArray(this.event.description);
      this.service.getRegisteredUserEmails(this.event._id).then(res =>{
        this.registeredUserIDs = res.ids;
        console.log(this.registeredUserIDs);
      });
    });
    this.userService.getUserById(getFieldFromJWT("userId")).then(res =>{
      this.userPlatforms = res.platforms;
    });
  }

  register(eventId:string){
    const userId = getFieldFromJWT("userId");
    this.service.registerToEvent(eventId,userId).then(res =>{
      window.location.reload();
    });
  }
  withdraw(eventId:string){
    const userId = getFieldFromJWT("userId");
    this.service.withdrawFromEvent(eventId,userId).then(res =>{
      window.location.reload();
    });
  }

}
