import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GenresPage } from '../pages/genres/genres';
import { DetailsPage } from '../pages/details/details';
import { DataProvider } from '../providers/data/data';
import { HttpModule } from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';
import { Keyboard } from '@ionic-native/keyboard';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    GenresPage,
    DetailsPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot(),
    BrowserAnimationsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    GenresPage,
    DetailsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    Keyboard,
    InAppBrowser,
    YoutubeVideoPlayer
  ]
})
export class AppModule {}
