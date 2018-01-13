import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import { environment } from '../../environments/environment';
import * as tumblr from 'tumblr.js';

@Injectable()
export class TumblrApiService {
  basepath = 'https://api.tumblr.com/';
  version = 'v2';
  client;
  tumblrProvider;

  private headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) {
    var client = tumblr.createClient({
      consumer_key: 'rYDQyAQHEpbcyqbfNydHCvLu2NW1xaVmKopFvb9cFGS75fh5pD',
      consumer_secret: 'JIrQXJJdlLSZRdguE65ZKqeEF1wvQ1GZ0Lh28GSUjEdAo2lw79',
      token: 'EIiZ2EK8hCDhVRcwYULGd1f4oMdlP3MSE1HQjEsc48KrtH5PX1',
      token_secret: 'QtEFlX3UlLePhGchvRol70X8GUvoJScRf1jSCM4Q743n2pNycj'
    });

    // Make the request
    this.client.userInfo(function (err, data) {
      console.log(data);
    });
  }

  url(path): string {
    return this.basepath + this.version + '/' + path;
  }

  private apiCall(method, path, params?): Promise<any> {

    if (method == 'GET' && params != undefined) {
      var keys = Object.keys(params);
      var values = (<any> Object).values(params);
      path += '?';

      for (var i = 0; i < keys.length; i++) {
        if (i != 0) {
          path += '&';
        }
        if (values[i] instanceof Array) {
          for (var j = 0; j < values[i].length; j++) {
            if (j != 0) {
              path += '&';
            }
            path += keys[i] + '[]=' + values[i][j];
          }
        } else {
          path += keys[i] + '=' + values[i];
        }
      }
      params = {};
    }

    return this.http.request(this.url(path), {
      method: method,
      body: params,
      headers: this.headers
    })
      .toPromise();//.catch(error => this.errorHandler(error as Error));
  }
}
