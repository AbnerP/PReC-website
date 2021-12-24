import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/users.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public service:SecurityService) { }

  ngOnInit() {
  }

}
