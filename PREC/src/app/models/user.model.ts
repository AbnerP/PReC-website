export interface userCredentials{
  firstName: string;
  lastName: string;
  email: string;
  password:string;
  platforms:Array<string>;
  steamID:string;
  psnID:string;
  xboxgamertag:string;
}

export interface userInfo{
  firstName: string;
  lastName: string;
  email: string;
  password:string;
  platforms:Array<string>;
  steamID:string;
  psnID:string;
  xboxgamertag:string;
}




export interface loginUserCredentials{
  email: string;
  password:string;
}

export interface loginResponse{
  message:string;
  token:string;
  expiresIn:string;
}
export interface userDTO{
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

export interface allUsers{
  users:Array<userDTO>;
  count:number;
}
