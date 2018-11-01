import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable()
export class TumblrApiService {
  basepath = 'http://localhost:8080/';
  tumblrProvider;

  private headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) {

  }

  getDashboard(offset) {
    return this.apiCall('GET', 'dashboard', {
      offset: offset
    }).then(data => {
      return JSON.parse(data._body);
    });
  }

  getPosts() {
    return this.apiCall('GET', 'posts').then(data => {
      return JSON.parse(data._body);
    });
  }
  auth() {
    return this.http.request('https://www.tumblr.com/oauth/authorize', {
      method: 'POST',
      body: {consumer_key: 'rYDQyAQHEpbcyqbfNydHCvLu2NW1xaVmKopFvb9cFGS75fh5pD', consumer_secret: 'JIrQXJJdlLSZRdguE65ZKqeEF1wvQ1GZ0Lh28GSUjEdAo2lw79'},
      headers: this.headers
    })
      .toPromise();
    // return this.apiCall('POST', '', {
    //   api_key: environment.consumer_key
    // }).then(data => {
    //   return JSON.parse(data._body);
    // });
  }

  url(path): string {
    return this.basepath + path;
  }

  private apiCall(method, path, params?): Promise<any> {

    if (method == 'GET' && params != undefined) {
      var keys = Object.keys(params);
      var values = (<any>Object).values(params);
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
