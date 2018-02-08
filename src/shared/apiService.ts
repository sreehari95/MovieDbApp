import { Injectable } from '@angular/core';
import { Http, Response, RequestOptions,  Headers } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { MovieList, MoviePage } from './movieListModal';

import { ToastController } from 'ionic-angular';


@Injectable()
export class ApiService {
    public favMovieList: MovieList[];
    baseUrl:string="https://api.themoviedb.org/3/discover/movie?api_key=adb4ddaf26e9d6ed16a2a5a737314990&page=";

    constructor( private http:Http,private toastCtrl: ToastController) {
    }


    getMovieList():Observable<MoviePage>{
        return this.http.get(`${this.baseUrl}1`)
           .map((response:Response)=> {
              return response.json();
          });
      }

      getMoreMovieList(page:number):Observable<MoviePage>{
        return this.http.get(`https://api.themoviedb.org/3/discover/movie?api_key=adb4ddaf26e9d6ed16a2a5a737314990&page=${page}`)
           .map((response:Response)=> {
              return response.json();
          });
      }

      searchMovies(name:string){
          return this.http.get('https://api.themoviedb.org/3/search/movie?api_key=adb4ddaf26e9d6ed16a2a5a737314990&query='+name)
          .map((response:Response)=> {
            return response.json();
        });
      }

      addFavourite(clickedMovie:MovieList){

        
      
         this.favMovieList=JSON.parse(localStorage.getItem('favList'));
         if(this.favMovieList==null)
         {
           clickedMovie.index=0;
           let a= [clickedMovie];
           window.localStorage.setItem('favList',JSON.stringify(a));
           this.showToast("bottom","Added to Favorites");
     
         }
         else{
           this.favMovieList=JSON.parse(localStorage.getItem('favList'));
           
           if(this.favMovieList.find(x=>x.id==clickedMovie.id)==null)
           {
             clickedMovie.index= this.favMovieList.length;
             
             this.favMovieList.push(clickedMovie);
             window.localStorage.setItem('favList',JSON.stringify(this.favMovieList));
             this.showToast("bottom","Added to Favorites");
           
           
           }
           else{
            // this.toast.show(`Aleady in Favorite List`, '5000', 'center').subscribe(
            //   toast => {
            //     console.log(toast);
            //   }
            // );

            this.showToast("bottom","Already In Favorites");
           }   
     
         }
      }

      showToast(position: string,send:string) {
        const toast = this.toastCtrl.create({
           message: send,
          position: position,
          duration: 1000
        });
    
        // toast.onDidDismiss(this.dismissHandler);
        toast.present();
      }
}