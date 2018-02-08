import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MovieList } from '../../shared/movieListModal';
import { ApiService } from '../../shared/apiService';

/**
 * Generated class for the MovieDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-movie-details',
  templateUrl: 'movie-details.html',
})
export class MovieDetailsPage {

  public selectedMovie:MovieList;

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService:ApiService) {
    this.selectedMovie=null;
    this.selectedMovie=this.navParams.data;
    
  }

  ionViewDidLoad() {
   
    this.selectedMovie=this.navParams.data;
   
  }
  addToFav(){
    
    this.apiService.addFavourite(this.selectedMovie);

  }
  readMore(clickedMovie: MovieList) {
    this.selectedMovie = clickedMovie;
    this.navCtrl.push(MovieDetailsPage, this.selectedMovie);

  }

  getfavouritefilled(id){
    const favourite = JSON.parse(localStorage.getItem('favList'));
    const index = favourite.findIndex(res=>{
      return res.id == id;
    })
    
    if(index>=0){
      return 'heart'
    }else{
      return 'heart-outline'
    }
   
  }

}
