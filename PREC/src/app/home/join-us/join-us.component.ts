import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-join-us',
  templateUrl: './join-us.component.html',
  styleUrls: ['./join-us.component.scss']
})
export class JoinUsComponent implements OnInit {
  discord:string = "https://discord.gg/bWvAEVQXwe";
  facebook:string = "https://www.facebook.com/PuertoRicoeRacingClub";
  instagram:string = "https://www.instagram.com/puertoricoeracing/";
  constructor() { }

  ngOnInit() {
  }

}
