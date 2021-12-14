import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-driver-card',
  templateUrl: './driver-card.component.html',
  styleUrls: ['./driver-card.component.scss']
})
export class DriverCardComponent implements OnInit {

  imageURL:string;
  name:string;
  consoles:Array<string>;
  games:Array<string>;
  gamertag:string;
  kudosPrimeLink:string;
  teamRole:Array<string>;
  nativeTown:string;
  racingMemory:string;

  constructor() { }

  ngOnInit(): void {
    this.imageURL = "assets/imgs/Abner_Pena_Portrait.jpg";
    this.name="Abner Peña";
    this.consoles=["PC","PS4"];
    this.games=["ACC","GT SPORT"];
    this.gamertag="PReC_APena";
    this.teamRole=["Driver","Web Page Maintance"];
    this.kudosPrimeLink="https://www.kudosprime.com/gts/stats.php?profile=10733830";
    this.nativeTown="Caguas, PR";
    this.racingMemory = "Watching Hamilton wint the 2008 F1 title";
  }

}
