import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginUserCredentials } from 'src/app/models/user.model';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:FormGroup

  constructor(private fb:FormBuilder,
    private router:Router,
    private service:SecurityService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email:['',Validators.required],
      password:['',Validators.required]
    })
  }

  saveChanges(){
    let user:loginUserCredentials = {
      email: this.form.value.email,
      password:this.form.value.password
    };

    this.service.login(user).then((res)=>{
      this.service.saveToken(res.data);
      this.router.navigate(['/home']);
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
