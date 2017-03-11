import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';

import { AppComponent } from './app.component';

export const firebaseConfig = {
  apiKey: 'AIzaSyA1UdpA1fraijFlcqsKEOuwMEgdKZmy8tg',
  authDomain: 'businesscontacts-d66c4.firebaseapp.com',
  databaseURL: 'https://businesscontacts-d66c4.firebaseio.com',
  storageBucket: 'businesscontacts-d66c4.appspot.com',
  messagingSenderId: '885571539692'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
