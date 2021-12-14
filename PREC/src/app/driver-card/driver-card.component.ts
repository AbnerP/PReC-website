import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss']
})
export class DriverCardComponent implements OnInit {

  @Input() imageURL:string;
  @Input() name:string;
  // consoles:Array<string>;
  // games:Array<string>;
  @Input() gamertag:string;
  @Input() kudosPrimeLink:string;
  @Input() teamRole:Array<string>;
  // nativeTown:string;
  // racingMemory:string;

  constructor() { }

  ngOnInit(): void {
  }

}
