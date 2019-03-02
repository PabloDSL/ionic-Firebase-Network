import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import * as firebase from 'firebase'


var config = {
  apiKey: "AIzaSyDr7p2S2B_WMSC5jOs-1NhhF55JiSHlSBk",
  authDomain: "registrojuvenil-7d331.firebaseapp.com",
  databaseURL: "https://registrojuvenil-7d331.firebaseio.com",
  projectId: "registrojuvenil-7d331",
  storageBucket: "registrojuvenil-7d331.appspot.com",
  messagingSenderId: "303939409608"
};
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
    firebase.initializeApp(config)
  }
}
