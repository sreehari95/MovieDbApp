import { Injectable } from '@angular/core';
import { Http, Response, URLSearchParams } from '@angular/http';
import 'rxjs';
import { Observable } from 'rxjs/Observable';
import { MovieList, MoviePage } from './movieListModal';

import { ToastController } from 'ionic-angular';



@Injectable()
export class ApiService {
  removedMovie: any;
  currentIndex: number;
  favoriteList: any;
    public favMovieList: MovieList[];
 
    baseUrl:string='https://api.themoviedb.org/3/discover/movie?api_key=adb4ddaf26e9d6ed16a2a5a737314990';
    searchUrl:string='https://api.themoviedb.org/3/search/movie?api_key=adb4ddaf26e9d6ed16a2a5a737314990';

    constructor( private http:Http,private toastCtrl: ToastController) {
     
    }


    getMovieList(data:any):Observable<MoviePage>{
      
      let urlParam= new URLSearchParams();
      urlParam.set(data.key, data.value);
      console.log({search:urlParam});
        return this.http.get(`${this.baseUrl}`,{search: urlParam})
           .map((response:Response)=> {
              return response.json();
              
          });
      }

      searchMovies(name:string){
          return this.http.get(`${this.searchUrl}&query=${name}`)
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
             this.remove(clickedMovie);
           }   
     
         }
      }

      remove(selectedMovie:MovieList){
        this.favoriteList=JSON.parse(localStorage.getItem('favList'));
        
        for(let i=0;i<this.favoriteList.length;i++){
          if(selectedMovie.id==this.favoriteList[i].id){
            this.currentIndex=this.favoriteList[i].index;
          }
        }
        this.removedMovie=this.favoriteList.splice(this.currentIndex,1);
           
         for(let i=this.currentIndex;i<this.favoriteList.length;i++){
             this.favoriteList[i].index=this.favoriteList[i].index-1;
         }
      
         window.localStorage.setItem('favList',JSON.stringify(this.favoriteList));
         this.showToast("bottom","Remove from Favorites")
     }

      showToast(position: string,send:string) {
        const toast = this.toastCtrl.create({
           message: send,
          position: position,
          duration: 1000
        });
    
        toast.present();
      }
}