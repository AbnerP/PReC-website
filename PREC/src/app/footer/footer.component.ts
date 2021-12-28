import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { SecurityService } from '../services/users.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  constructor(public service:SecurityService) { }
  imgURL:string = environment.backendAPIURL+"/images/61cb24aceb63a128cec77080";
  ngOnInit() {

  }

}
