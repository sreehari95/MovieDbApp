import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ApiService } from '../../shared/apiService';
import { MovieList, MoviePage } from '../../shared/movieListModal';
import { MovieDetailsPage } from '../movie-details/movie-details';

/**
 * Generated class for the SearchResultsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search-results',
  templateUrl: 'search-results.html',
})
export class SearchResultsPage {

  public moviePage: MoviePage;
  public selectedMovie: MovieList;

  public searchLabel:string;
  public searchmovieList: MovieList[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public apiService:ApiService) {
  }

  ionViewDidLoad() {
  
    this.searchLabel=this.navParams.data;
    this.apiService.searchMovies(this.searchLabel).subscribe(data=>{
      this.moviePage=data;
      
      this.searchmovieList=data.results;
   
  });
  }
  readMore(clickedMovie:MovieList){
    this.selectedMovie=clickedMovie;
   this.navCtrl.push(MovieDetailsPage,this.selectedMovie);
 
  }

  searchMovie(){
   
    this.navCtrl.push(SearchResultsPage,this.searchLabel);
 
 
  }
  addToFav(clickedMovie: MovieList) {
    this.apiService.addFavourite(clickedMovie);
  }

  getfavouritefilled(id){
    const favourite = JSON.parse(localStorage.getItem('favList'));
    if(favourite==null){
      return 'heart-outline'
    }
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
