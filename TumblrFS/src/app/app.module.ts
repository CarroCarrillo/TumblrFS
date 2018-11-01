import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';

import { TumblrApiService } from './services';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgxLoadingModule.forRoot({})
  ],
  providers: [
    TumblrApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
