export interface eventsDTO{
  events: Array<eventDTO>;
  count:number;
}

export interface eventDTO{
  _id:string;
  name: string;
  date:string;
  startTime: string;
  game:string;
  track:string;
  duration:string;
  description: string;
  imageURL:string;
  contactInfo:string;
}
