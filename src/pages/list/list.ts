import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MovieList } from '../../shared/movieListModal';
import { Console } from '@angular/core/src/console';
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
    this.favoriteList=JSON.parse(localStorage.getItem('favList'))
    
}

readMore(clickedMovie: MovieList) {
  this.selectedMovie = clickedMovie;
  this.navCtrl.push(MovieDetailsPage, this.selectedMovie);

}
remove(selectedMovie:MovieList){
  this.currentIndex=selectedMovie.index;

  this.removedMovie=this.favoriteList.splice(this.currentIndex,1);


  for(let i=this.currentIndex;i<this.favoriteList.length;i++){
      this.favoriteList[i].index=this.favoriteList[i].index-1;
      
  }

  window.localStorage.setItem('favList',JSON.stringify(this.favoriteList));
  this.apiService.showToast("bottom","Remove from Favorites")
}
}
