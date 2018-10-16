import { Component, OnInit } from '@angular/core';

import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  public username: string;
  public password: string;
  public logged = false;

  constructor(private usrSvc: UsersService) {
   }

  ngOnInit() {

  }

  login() {
    this.usrSvc.login(this.username, this.password);
  }

  register() {
    this.usrSvc.register(this.username, this.password);
  }

  logout() {
    localStorage.removeItem('token');
  }
}
