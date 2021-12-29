import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SecurityService } from 'src/app/services/users.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  innerWidth:number;
  cutOff:boolean;
  imgURL:string = environment.backendAPIURL+"/images/61cb24aceb63a128cec77080";

  constructor(public service:SecurityService,
    private router:Router) { }
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.cutOff = this.innerWidth < 950;
  }

  logout(){
    this.service.logout();
    this.router.navigate(['/']);
  }
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.cutOff = this.innerWidth < 950;
  }
}
