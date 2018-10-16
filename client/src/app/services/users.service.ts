import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private serverURL = 'localhost';
  private serverPort = 3000;

  constructor(private http: HttpClient) { }

  login(username, password): void {
    const body = {
      username: username,
      password: password,
    };
    this.http.post(`http://${this.serverURL}:${this.serverPort}/login`, body)
    .subscribe(res => {
      if (res && res['token']) {
         localStorage.setItem('token', res['token']);
      }
    });
  }

  register(username, password) {
    const body = {
      username: username,
      password: password,
    };
    this.http.post(`http://${this.serverURL}:${this.serverPort}/register`, body)
    .subscribe(res => {
      console.log('res:  ', res);
    });
  }

  getDataForUser() {

  }
}
