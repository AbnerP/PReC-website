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

  configureAuthorizationHeader(){
    const token = localStorage.getItem("JWT")
    const jwt = `Bearer ${token}`;
    return {
      headers: {
        Authorization: jwt,
      }
    };
  }

  isAuthenticated():boolean{
    const token = localStorage.getItem("JWT");

    if(!token){
      return false;
    }

    const expiration = localStorage.getItem("JWT-Expiration");
    const expirationDate = new Date(expiration);

    if(expirationDate <= new Date()){
      this.logout();
      return false;
    }
    return true;
  }
  
  getFieldFromJWT(field: string): string {
    const token = localStorage.getItem("JWT");
    if (!token){return '';}
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }

  getRole():string{
    return this.getFieldFromJWT('role');
  }

  async signup(user:userCredentials){
    const res = await axios.post(this.apiURL+"/signup",user);
    return res;
  }

  async login(user:loginUserCredentials){
    try{
      const res = await axios.post<loginResponse>(this.apiURL+"/login",user);
      return res;
    }catch(e){
      return Promise.reject(e);
    }
  }

  logout(){
    localStorage.removeItem("JWT");
    localStorage.removeItem("JWT-Expiration");
  }

  saveToken(res:loginResponse){
    localStorage.setItem("JWT",res.token);
    localStorage.setItem("JWT-Expiration",res.expiresIn);
  }

  async getAllUsers(){
    const config = this.configureAuthorizationHeader();

    const res = await axios.get(this.apiURL,config);
    return res.data;
  }

  async makeAdmin(id:string){
    const config = this.configureAuthorizationHeader();

    const res = await axios.post(this.apiURL+`/makeAdmin/${id}`,{},config);
    return res.data;
  }

  async delete(id:string){
    const config = this.configureAuthorizationHeader();

    const res = await axios.delete(this.apiURL+`/${id}`,config);
    return res.data;
  }

  async updateUser(id:string){
    const config = this.configureAuthorizationHeader();

    const res = await axios.delete(this.apiURL+`/update/${id}`,config);
    return res.data;
  }




}
