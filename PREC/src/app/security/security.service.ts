import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { loginResponse, loginUserCredentials, userCredentials } from '../models/user.model';
import axios from "axios";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  private apiURL = environment.backendAPIURL + '/user';

  constructor() { }

  isAuthenticated():boolean{
    return true;
  }

  getRole():string{
    return '';
  }

  async signup(user:userCredentials){
    const res = await axios.post(this.apiURL+"/signup",user);
    return res;
  }

  async login(user:loginUserCredentials){
    const res = await axios.post<loginResponse>(this.apiURL+"/login",user);
    return res;
  }

  saveToken(res:loginResponse){
    localStorage.setItem("JWT",res.token);
  }
}
