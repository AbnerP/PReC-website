import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userCredentials } from 'src/app/models/user.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  form:FormGroup;

  constructor(private fb:FormBuilder,
    private service:SecurityService,
    private router:Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      email: ['',{validators:[Validators.required,Validators.email]}],
      password:['',Validators.required],
      steamID:['',],
      psnID:['',],
      xboxgamertag:['',]
    });
  }

  saveChanges(){
    let user:userCredentials = {
      firstName: this.form.value.firstName,
      lastName:this.form.value.lastName,
      email: this.form.value.email,
      password:this.form.value.password,
      steamID:this.form.value.steamID,
      psnID:this.form.value.psnID,
      xboxgamertag: this.form.value.xboxgamertag
    };

    this.service.signup(user).then((res)=>{
      this.router.navigate(['/login']);
    });


    // if(this.id !== null){
    //   this.service.updateEvent(this.id,event,this.eventIMG).then(res =>{
    //     this.router.navigate(['/events']);
    //   });
    // }else{
    //   this.service.createEvent(event,this.eventIMG).then(res =>{
    //     this.router.navigate(['/events']);
    //   });
    // }

  }
}
