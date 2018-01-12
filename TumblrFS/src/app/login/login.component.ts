import { Component, OnInit } from '@angular/core';
import { environment } from '../../environments/environment';
import * as tumblr from 'tumblr.js';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    var client = tumblr.createClient({
      consumer_key: environment.consumer_key,
      consumer_secret: environment.secret_key,
      token: '<oauth token>',
      token_secret: '<oauth token secret>'
    });

  }

}
