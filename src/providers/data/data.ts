import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DataProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class DataProvider {

  headers = new Headers({
    'X-Mashape-Key': 'UAMxsftQ9tmsh1f3l2rT1NFNMuL3p1hPZTvjsn57DqJz0QKtWu'
  });
  options = new RequestOptions({ headers: this.headers });
  limit:number = 50;

  constructor(public http: Http) {
    console.log('Hello DataProvider Provider');
  }

  getGames(genre, offsetNum = 0) {
    let genreId = genre.id ? genre.id : genre;
    let offset = offsetNum;
    return this.http.get(`https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name,release_dates,screenshots&limit=${this.limit}&offset=${offset}&order=release_dates.date:desc&filter[genres][eq]=${genreId}&filter[screenshots][exists]`, this.options)
      .map(res => res.json());
  }

  getFavorites(favs) {
    let favorites = favs;
    favorites = favorites.join();
    return this.http.get(`https://igdbcom-internet-game-database-v1.p.mashape.com/games/${favorites}?fields=name,release_dates,screenshots&order=release_dates.date:desc&filter[screenshots][exists]`, this.options)
      .map(res => res.json());
  }

  getGenres() {
    return this.http.get('https://igdbcom-internet-game-database-v1.p.mashape.com/genres/?fields=*', this.options)
      .map(res => res.json());
  }

  searchGames(kw) {
    let keyword = kw;
    return this.http.get(`https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name,release_dates,screenshots&limit=${this.limit}&offset=0&order=release_dates.date:desc&search=${keyword}`, this.options)
      .map(res => res.json());
  }

  getGame(game) {
    let gameId = game;
    return this.http.get(`https://igdbcom-internet-game-database-v1.p.mashape.com/games/${gameId}?fields=*`, this.options)
      .map(res => res.json());
  }

  getPerspective(perspective) {
    let perspId = perspective;
    return this.http.get(`https://igdbcom-internet-game-database-v1.p.mashape.com/player_perspectives/${perspId}?fields=*`, this.options)
      .map(res => res.json());
  }

}
