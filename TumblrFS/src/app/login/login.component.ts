import { Component, OnInit } from '@angular/core';
import { TumblrApiService } from '../services';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private tumblrApi: TumblrApiService) { }

  ngOnInit() {

  }

}
