import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  public logged = false;
  public username = '';


  constructor(private http: HttpClient,
              private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.route.queryParams.subscribe( param => {
      this.username = param.user;
    });
  }

}
