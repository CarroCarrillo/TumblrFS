import { Component, OnInit, HostListener } from '@angular/core';
import { TumblrApiService } from '../services';
import { environment } from '../../environments/environment';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  posts;
  index = 0;
  photo = 0;
  offset = 0;
  limit = 20;

  constructor(private tumblrApi: TumblrApiService) {}

  @HostListener('document:keydown', ['$event']) keyDown(event: KeyboardEvent) {
    console.log(event);
    switch(event.key) {
      case 'ArrowRight':
        this.next();
        break;
      case 'ArrowLeft':
        this.previous();
        break;
      case 'Enter':
        this.next();
        break;
    }
  }

  ngOnInit() {
    this.tumblrApi.getDashboard(this.offset).then(posts => {
      console.log(posts);
      this.posts = posts;
    });
  }

  next() {
    this.photo++;
    if (this.posts[this.index].photos) {
      if (!this.posts[this.index].photos[this.photo]) {
        this.index++;
        this.photo = 0;
        if (!this.posts[this.index]) {
          this.offset++;
          this.index = 0;
          this.photo = 0;
          this.ngOnInit();
        }
      }
    } else {
      this.index++;
    }

    console.log('Index: ' + this.index + ' - Photo: ' + this.photo);
  }

  previous() {
    this.photo--;
    if (this.posts[this.index].photos) {
      if (!this.posts[this.index].photos[this.photo]) {
        this.index--;
        this.photo = this.posts[this.index].photos.length - 1;
        if (!this.posts[this.index]) {
          this.offset = this.offset > 0 ? this.offset - 1 : 0;
          this.index = this.limit;
          this.photo = this.posts[this.index].photos.length - 1;
          this.ngOnInit();
        }
      }
    } else {
      this.index--;
    }

    console.log('Index: ' + this.index + ' - Photo: ' + this.photo);
  }

  getVideo(video) {
    console.log(typeof video);
    console.log(video);
    let sub = video.substring(video.indexOf('hdUrl'));
    console.log(sub);
    let url = sub.split('\"')[1] != ":false," ? sub.split('\"')[2] : video.substring(video.indexOf('<source src=')).split('"')[1];
    console.log(url);
    return url;
  }

}
