import { driverInfo } from "./drivers.model";

export interface driversDTO{
  drivers:Array<driverDTO>;
  count:number;
}

export interface driverDTO{
  _id:string;
  name:string;
  teamRole:Array<string>;
  gamertag:string;
  kudosPrimeLink:string;
  imageURL:string;
}
