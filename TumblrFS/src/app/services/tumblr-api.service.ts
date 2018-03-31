import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { environment } from '../../environments/environment';


@Injectable()
export class TumblrApiService {
  basepath = 'https://api.tumblr.com/';
  version = 'v2';
  direccion = 'fetishandbdsm.tumblr.com';
  tumblrProvider;

  private headers = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  constructor(private http: Http) {

  }

  getColorbrillantePosts() {
    return this.apiCall('GET', 'blog/' + this.direccion + '/posts', {
      api_key: environment.consumer_key
    }).then(data => {
      return JSON.parse(data._body);
    });
  }

  url(path): string {
    return this.basepath + this.version + '/' + path;
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
