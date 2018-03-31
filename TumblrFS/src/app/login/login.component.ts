import { Component, OnInit } from '@angular/core';
import { TumblrApiService } from '../services';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  posts;
  index = 0;
  photo = 0;

  constructor(private tumblrApi: TumblrApiService) { }

  ngOnInit() {
    this.tumblrApi.getColorbrillantePosts().then(posts => {
      this.posts = posts.response.posts;
    });
  }

  next() {
    this.photo++;
    if (this.posts[this.index].photos) {
      if (!this.posts[this.index].photos[this.photo]) {
        this.index++;
        this.photo = 0;
        if (!this.posts[this.index]) {
          this.index = 0;
          this.photo = 0;
        }
      }
    } else {
      this.index++;
    }
  }

}
