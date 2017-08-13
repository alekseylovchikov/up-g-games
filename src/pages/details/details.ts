import { Component, trigger, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
  animations: [
    trigger('fadeIn', [
      transition('void => *', [
        animate('600ms ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(-70px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(25px)', offset: 0.75 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
        ]))
      ])
    ]),
    trigger('fadeUp', [
      transition('void => *', [
        animate('900ms ease-in', keyframes([
          style({ opacity: 0, transform: 'translateY(70px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateY(0)', offset: 1 }),
        ]))
      ])
    ]),
  ]
})
export class DetailsPage {

  gameId: number;
  game: object;
  perspective: object;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider, private iab: InAppBrowser, private youtube: YoutubeVideoPlayer) {
    this.gameId = navParams.get('game');
  }

  ionViewDidLoad() {
    this._data.getGame(this.gameId)
      .subscribe(res => {
        if (res[0].player_perspectives) {
          this._data.getPerspective(res[0].player_perspectives[0])
            .subscribe(res => this.perspective = res[0]);
        }
        this.game = res[0];
      });
  }

  launchSite(url) {
    const browser = this.iab.create(url, '_system');
    browser.close();
  }

  playVideo(video) {
    this.youtube.openVideo(video);
  }

}
