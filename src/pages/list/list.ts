import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MovieList } from '../../shared/movieListModal';
import { MovieDetailsPage } from '../movie-details/movie-details';

import { ApiService } from '../../shared/apiService';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  selectedMovie: MovieList;
  public favoriteList:MovieList[];
  public removeItem:MovieList;
  public currentIndex:number;
  public removedMovie:MovieList[];
 
  

  constructor(public navCtrl: NavController, public navParams: NavParams,public apiService:ApiService) {
  
    
}
ionViewWillEnter(){
  this.ionViewDidLoad();
}
ionViewDidLoad() {
  this.favoriteList=JSON.parse(localStorage.getItem('favList'));
}

readMore(clickedMovie: MovieList) {
  this.selectedMovie = clickedMovie;
  this.navCtrl.push(MovieDetailsPage, this.selectedMovie);

}
remove(selectedMovie:MovieList){
  this.apiService.remove(selectedMovie);
  this.ionViewWillEnter();
}
}
