import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login.major',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

public model = {
  name: '',
  password: ''
};
public error = '';
public success = '';

  constructor(private http: HttpClient,
              private router: Router,
              private modal: NgbModal) { }

  ngOnInit() {
  }

  public signup() {
    const body = `username=${this.model.name}&password=${this.model.password}`;
    this.http.post('http://localhost:3000/signup', body, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }})
    .subscribe(
      res => {
        this.error = '';
        this.success = 'You can now login';
      },
      err => {
        this.success = '';
        this.error = err.error;
      }
    );
  }

  public login() {
    const body = `username=${this.model.name}&password=${this.model.password}`;
    this.http.post('http://localhost:3000/login', body, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded'
      }})
    .subscribe(
      (res: any) => {
        this.router.navigate(['/home'], {queryParams: {user: res.username}});
      },
      err => {
        console.log(err);
        this.error = err.error;
        this.success = '';
      }
    );
  }

  public openDialog(content) {
    this.error = '';
    this.success = '';
    this.modal.open(content).result.then( result => {
        this.signup();
    });
  }
}
