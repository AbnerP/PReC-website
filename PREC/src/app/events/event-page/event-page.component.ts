import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { eventDTO } from 'src/app/models/events.model';
import { userInfo, userInfoWithId } from 'src/app/models/user.model';
import { EventsService } from 'src/app/services/events.service';
import { SecurityService } from 'src/app/services/users.service';
import { getFieldFromJWT, stringToMultiLineArray } from 'src/app/utils';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss']
})
export class EventPageComponent implements OnInit {
  displayedColumns: string[] = ['position','firstName', 'lastName','_id'];

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
  registeredUsers:Array<userInfoWithId> = [];
  userId:string = getFieldFromJWT("userId");

  constructor(private service:EventsService,
    private userService:SecurityService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.service.geteventByID(this.id).then(data => {
      this.event = data;
      this.description =  stringToMultiLineArray(this.event.description);
      this.service.getRegisteredUsers(this.event._id).then(res =>{
        this.registeredUsers = res.users;
        for(let i = 0; i < this.registeredUsers.length; i++){
          this.registeredUsers[i]["position"] = i+1;
        }
      });
      console.log(this.checkID());
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

  checkID():boolean{
    return this.registeredUsers.filter(u => u._id === this.userId).length > 0
  }

  getPlatformId(id:string){
    const user = this.registeredUsers.filter(u => u._id === id)[0];
    if(this.event.platform === "Steam") {
      return user.steamID;
    }else if(this.event.platform === "Xbox"){
      return user.xboxgamertag;
    }else{
      return user.psnID;
    }
  }

  registrationLimit():boolean{
    return parseInt(this.event.numberRegisteredUsers) < this.event.registrationLimit;
  }

}
