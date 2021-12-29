import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { userCredentials, userInfo } from 'src/app/models/user.model';
import { SecurityService } from '../../services/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  @Input() mode:string;
  form:FormGroup;
  checkBoxPlatforms:Array<string> = ["PlayStation", "Xbox", "Steam"];

  constructor(private fb:FormBuilder,
    private service:SecurityService,
    private router:Router) { }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    if(this.mode === "settings"){
      this.form = this.fb.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        email: ['',{validators:[Validators.required,Validators.email]}],
        platforms:this.fb.array(this.checkBoxPlatforms.map(x => !1)),
        steamID:['',],
        psnID:['',],
        xboxgamertag:['',]
      });
      this.service.getUserById(this.service.getFieldFromJWT("userId")).then(res =>{
        const checkBoxVals:Array<number> = this.checkBoxPlatforms.map((x,i) => res.platforms.includes(x) ? 1 : 0);
        this.form.controls["firstName"].patchValue(res.firstName);
        this.form.controls["lastName"].patchValue(res.lastName);
        this.form.controls["email"].patchValue(res.email);
        this.form.controls["platforms"].patchValue(checkBoxVals);
        this.form.controls["steamID"].patchValue(res.steamID);
        this.form.controls["psnID"].patchValue(res.psnID);
        this.form.controls["xboxgamertag"].patchValue(res.xboxgamertag);
      });

    }else{
      this.form = this.fb.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        email: ['',{validators:[Validators.required,Validators.email]}],
        password:['',Validators.required],
        platforms:this.fb.array(this.checkBoxPlatforms.map(x => !1)),
        steamID:['',],
        psnID:['',],
        xboxgamertag:['',]
      });
    }
  }

  get platforms(){
    let arr:FormArray = this.form.controls["platforms"] as FormArray;
    return arr;
  }

  addTeamRole(){
    this.platforms.push(this.fb.group({
      platform:['']
    }));
  }

  convertStringArrToBoolean(arr){
    console.log(arr);
  }

  convertCheckboxToValue(booleans: Array<string>) {
    let vals:Array<string>=[];
    for(let i = 0; i<booleans.length;i++){
      if(booleans[i]){
        vals.push(this.checkBoxPlatforms[i]);
      }
    }
    return vals.length > 0 ? vals : [""];
  }

  saveChanges(){
    let userPlatforms:Array<string> = this.convertCheckboxToValue(this.form.value["platforms"]);

    let user:userCredentials = {
      firstName: this.form.value.firstName,
      lastName:this.form.value.lastName,
      email: this.form.value.email,
      platforms:userPlatforms,
      password:this.form.value.password,
      steamID:this.form.value.steamID,
      psnID:this.form.value.psnID,
      xboxgamertag: this.form.value.xboxgamertag
    };

    this.service.signup(user).then((res)=>{
      this.router.navigate(['/login']);
    });
  }

  submitForm(){
    if(this.mode === "settings"){
      this.updateUser();
    }else{
      this.saveChanges();
    }
  }

  updateUser(){
    let userPlatforms:Array<string> = this.convertCheckboxToValue(this.form.value["platforms"]);

    const psnVal = this.form.value["platforms"][0] ? this.form.value.psnID : '';
    const xboxVal = this.form.value["platforms"][1] ? this.form.value.xboxgamertag : '';
    const steamVal = this.form.value["platforms"][2] ? this.form.value.steamID : '';

    let user:userInfo = {
      firstName: this.form.value.firstName,
      lastName:this.form.value.lastName,
      email: this.form.value.email,
      platforms:userPlatforms,
      password:this.form.value.password,
      steamID:steamVal,
      psnID:psnVal,
      xboxgamertag: xboxVal
    };
    console.log(user);

    this.service.updateUser(user).then((res)=>{
      this.router.navigate(['/home']);
    });
  }
}
