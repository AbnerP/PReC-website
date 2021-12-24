import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { allUsers, userDTO } from '../models/user.model';
import { SecurityService } from '../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users:Array<userDTO>;
  displayedColumns: string[] = ['email', 'firstName', 'lastName', 'role'];

  constructor(private userService:SecurityService,
    private router:Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().then((res)=>{
      this.users = res.users;

    });
  }

  deleteUser(id:string){
    this.userService.delete(id).then(res=>{
      location.reload();
        })
  }
  makeAdmin(id:string){
    this.userService.makeAdmin(id).then(res =>{
      location.reload();
    })
  }

}
