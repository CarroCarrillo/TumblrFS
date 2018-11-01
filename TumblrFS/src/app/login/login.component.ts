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
  since_id = 0;
  sinceIdArray = new Array<number>();
  limit = 20;
  forward = true;
  
  loading;

  constructor(private tumblrApi: TumblrApiService) {
    this.sinceIdArray.push(this.since_id);
  }

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
    this.loading = true;
    this.tumblrApi.getDashboard(this.since_id).then(posts => {
      console.log(posts);
      this.posts = posts;
      if(!this.forward) {
        this.index = this.posts.length - 1;
        this.photo = this.photoPrevious;
      }
      this.loading = false;
    });
  }

  next() {
    this.forward = true;
    this.photo++;
    if (this.posts[this.index].photos) {
      if (!this.posts[this.index].photos[this.photo]) {
        this.index++;
        this.photo = 0;
        if (!this.posts[this.index]) {
          this.since_id = this.posts[this.index - 1].id;
          this.sinceIdArray.push(this.since_id);
          console.log(this.since_id);
          this.index = 0;
          this.photo = 0;
          this.ngOnInit();
        }
      }
    } else {
      this.index++;
      this.photo = 0;
    }

    console.log('Index: ' + this.index + ' - Photo: ' + this.photo);
  }

  previous() {
    this.forward = false;
    this.photo--;
    if (this.posts[this.index].photos && this.photo > 0) {
      if (!this.posts[this.index].photos[this.photo] && this.index > 0) {
        this.index--;
        this.photo = this.posts[this.index].photos.length - 1;
        if (!this.posts[this.index]) {
          // Ir hacia atrás en un array de since_id
          this.index = this.limit;
          this.photo = this.posts[this.index].photos.length - 1;
          this.ngOnInit();
        }
      }
    } else if(this.index > 0) {
      this.index--;
      this.photo = this.photoPrevious;
    } else {
      this.sinceIdArray.pop();
      this.since_id = this.sinceIdArray[this.sinceIdArray.length - 1];
      this.ngOnInit();
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

  private get photoPrevious() {
    return (this.posts[this.index].type === 'link' || 'text') ? 0 : this.posts[this.index].photos.length - 1;
  }

}
