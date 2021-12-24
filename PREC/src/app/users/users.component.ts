import { Component, OnInit } from '@angular/core';
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

  constructor(public userService:SecurityService) { }

  ngOnInit(): void {
    this.userService.getAllUsers().then((res)=>{
      this.users = res.users;

    });
  }

  hey(){}

}
