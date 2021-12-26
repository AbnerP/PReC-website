export interface eventsDTO{
  events: Array<eventDTO>;
  count:number;
}

export interface eventDTO{
  _id:string;
  name: string;
  date:Date;
  startTime: string;
  game:string;
  track:string;
  duration:string;
  description: string;
  imageURL:string;
  contactInfo:string;
  numberRegisteredUsers:string;
  platform:string;
  registrationLimit:number;
  host:string;
}

export interface eventCreationDTO{
  name: string;
  date:Date;
  startTime: string;
  game:string;
  track:string;
  duration:string;
  description: string;
  contactInfo:string;
  platform:string;
  registrationLimit:number;
  host:string;
}

export interface registeredUserIDs{
  ids:Array<string>;
  count:number;
}
