export interface userCredentials{
  firstName: string;
  lastName: string;
  email: string,
  password:string;
  steamID:string;
  psnID:string;
  xboxgamertag:string;
}

export interface loginUserCredentials{
  email: string,
  password:string;
}

export interface loginResponse{
  message:string,
  token:string
}
