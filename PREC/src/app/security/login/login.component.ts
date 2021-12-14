import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { userCredentials } from '../security.models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  // constructor(private security:SecurityService,

  errors:string[]= [];

  login(userCredentials:userCredentials){
  //   this.security.login(userCredentials).subscribe(authenticationResponse =>{
  //     this.security.saveToken(authenticationResponse);
  //
  //   },error => this.errors = parseWebAPIErrors(error));
    this.router.navigate(['/']);
  }
}
