import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parseWebAPIErrors } from '../../utilities/utils';
import { userCredentials } from '../security.models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(/*private securityService:SecurityService,*/
    private router:Router) { }

  errors:string[] = [];

  ngOnInit(): void {
  }

  register(userCredentials:userCredentials){
    // this.errors = [];
    // this.securityService.register(userCredentials).subscribe(authenticationResponse => {
    //   console.log(authenticationResponse);
    //   this.securityService.saveToken(authenticationResponse);
    //
    // }, error => this.errors = parseWebAPIErrors(error));
    this.router.navigate(['/']);
  }

}
