import { Component, ViewChild, trigger, style, transition, animate, keyframes } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ModalController, Content } from 'ionic-angular';
import { DataProvider } from '../../providers/data/data';
import { Storage } from '@ionic/storage';
import { GenresPage } from '../genres/genres';
import { Keyboard } from '@ionic-native/keyboard';
import { DetailsPage } from '../details/details';

/**
 * Generated class for the HomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('300ms ease-in', keyframes([
          style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
          style({ opacity: 0, transform: 'translateX(-50px)', offset: 1 }),
        ]))
      ]),
      transition(':enter', [
        animate('300ms ease-in', keyframes([
          style({ opacity: 0, transform: 'translateX(-50px)', offset: 0 }),
          style({ opacity: 1, transform: 'translateX(0)', offset: 1 }),
        ]))
      ])
    ])
  ]
})
export class HomePage {

  @ViewChild(Content) content: Content;
  showSearch = false;
  games = [];
  genre: any;
  genreName: string = 'UP-G';
  favorites = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private _data: DataProvider, private storage: Storage, public loading: LoadingController, public modalCtrl: ModalController, public keyboard: Keyboard) {
    let loader = this.loading.create({
      content: 'Загрузка...'
    });

    loader.present().then(() => {

      this.storage.get('genre')
        .then((val) => {
          if (!val) {
            this.genre = 4;
            this.genreName = 'Fighting';
            this.storage.set('genre', this.genre);
          } else {
            this.genre = val;
            // this.genreName = val.name;
          }
        })
        .then(() => {
          this._data.getGames(this.genre, 0)
            .subscribe(res => {
              this.games = res;
            });
        });

      this.storage.get('favorites').then(val => {
        if (!val) {
          this.storage.set('favorites', this.favorites);
        } else {
          this.favorites = val;
        }
      });

      setTimeout(() => {
        loader.dismiss();
      }, 1000);
    });
  }

  openFavorites() {
    this.storage.get('favorites').then(val => {
      // let loader = this.loading.create({
      //   content: 'Загрузка списка'
      // });
      this.genreName = 'Буду ждать';

      if (val.length !== 0) {
        this._data.getFavorites(val)
          .subscribe(res => {
            this.games = res;
          });
      } else {
        this.games.length = 0;
      }
      // setTimeout(() => loader.dismiss(), 1000);
    });
  }

  openGenres() {
    let myModal = this.modalCtrl.create(GenresPage);

    myModal.onDidDismiss(genre => {
      let loader = this.loading.create({
        content: 'Загрузка...'
      });

      if (genre) {
        loader.present().then(() => {
          this.storage.get('genre').then(val => {
            this.genre = val.id;
            this.genreName = val.name;

            this._data.getGames(this.genre, 0)
              .subscribe(res => this.games = res);
          });
        });
      }
      setTimeout(() => {
        loader.dismiss();
      }, 1000);
    });
    myModal.present();
  }

  showSearchBox() {
    this.showSearch = !this.showSearch;
    this.content.scrollToTop();
  }

  favorite(id) {
    this.favorites.push(id);
    this.favorites = this.favorites.filter((item, i, ar) => ar.indexOf(item) === i);
    this.storage.set('favorites', this.favorites);
  }

  removeFavorite(id) {
    this.favorites = this.favorites.filter(item => item !== id);
    this.storage.set('favorites', this.favorites);
  }

  search(term) {
    let searchTerm = term;
    this.keyboard.close();
    this.genreName = searchTerm;
    this.showSearch = false;
    this._data.searchGames(searchTerm)
      .subscribe(res => this.games = res);
  }

  detailsPage(game) {
    this.navCtrl.push(DetailsPage, {
      game: game
    });
  }

  ionViewDidLoad() {

  }

}
