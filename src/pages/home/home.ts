import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ApiService } from '../../shared/apiService';
import { MovieList, MoviePage } from '../../shared/movieListModal';
import { MovieDetailsPage } from '../movie-details/movie-details';
import { SearchResultsPage } from '../search-results/search-results';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public moviePage: MoviePage;
  public movieList: MovieList[];
  public favMovieList: MovieList[];
  public addToMovieList: MovieList[];
  public selectedMovie: MovieList;
  public pageNumber: number;
  public favnumber: number;
  public searchLabel: string;
  public movieString: string;
  public demoArray: MovieList;
  
  constructor(public navCtrl: NavController,
    public apiService: ApiService,
    public storage: Storage) {

    this.pageNumber = 1;

   
  }

  ionViewDidLoad() {
    this.apiService.getMovieList().subscribe(data => {
      this.moviePage = data;
      this.movieList = data.results;
    });
  }

  loadMore(event) {
   
    this.pageNumber = this.pageNumber + 1;
    this.apiService.getMoreMovieList(this.pageNumber).subscribe(data => {
      this.movieList = this.movieList.concat(data.results);
      event.complete();
    });
  }
  
  readMore(clickedMovie: MovieList) {
    this.selectedMovie = clickedMovie;
    this.navCtrl.push(MovieDetailsPage, this.selectedMovie);

  }

  searchMovie(event) {
   
    this.navCtrl.push(SearchResultsPage, this.searchLabel);


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
