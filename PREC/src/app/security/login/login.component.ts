import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { loginUserCredentials } from 'src/app/models/user.model';
import { SecurityService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form:FormGroup
  error:string;

  constructor(private fb:FormBuilder,
    private router:Router,
    private service:SecurityService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required]
    })
  }

  saveChanges(){
    this.error = null;
    let user:loginUserCredentials = {
      email: this.form.value.email,
      password:this.form.value.password
    };

    try{
      this.service.login(user).then((res)=>{
        // console.log(res.data);
        if(res.data.message === "Auth succesful"){
          console.log(res);
          this.service.saveToken(res.data);
          this.router.navigate(['/home']);
        }else{
          this.error = "Email or password incorrect";
        }
      });
    }catch(e){
      this.error = "Email or password incorrect";
    }
  }
}
