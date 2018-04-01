import { Component, OnInit } from '@angular/core';
import { TumblrApiService } from '../services';
import * as oauthSignature from 'oauth-signature';
import { environment } from '../../environments/environment';
declare var $: any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  posts;
  index = 0;
  photo = 0;

  constructor(private tumblrApi: TumblrApiService) {
    // oauthSignature.generate('GET', url, parameters, consumerSecret, tokenSecret, options)
    // this.tumblrApi.auth().then(res => {
    //   console.log(res);
    // });
    // var myRedirect = function(redirectUrl, key, secret) {
    //   var form = $('<form action="' + redirectUrl + '" method="post">' +
    //   '<input type="hidden" name="oauth_consumer_key" value="' + key + '">'+
    //   '</input><input type="hidden" name="consumer_secret" value="' + secret + '"></input>' +
    //   '</input><input type="hidden" name="oauth_signature" value="' + '' + '"></input>' +
    //   '</form>');
    //   $('body').append(form);
    //   $(form).submit();
    // };
    // var fd = new FormData();
    // fd.append('consumer_key', environment.consumer_key);
    // fd.append('consumer_secret', environment.secret_key);
    // var req = new XMLHttpRequest();
    // req.open('POST', 'https://api.tumblr.com/console/auth', true);
    // req.onreadystatechange = function (aEvt) {
    //   if (req.readyState == 4) {
    //     if (req.status == 200)
    //       console.log(req.responseText);
    //     else
    //       console.log("Error loading page\n");
    //   }
    // };
    // // req.setRequestHeader('Access-Control-Allow-Origin', '*');
    // req.send(fd);
    // myRedirect('https://www.tumblr.com/oauth/request_token', environment.consumer_key, environment.secret_key);
  }

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

    console.log('Index: ' + this.index + ' - Photo: ' + this.photo);
  }

}
