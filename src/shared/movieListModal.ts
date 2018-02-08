export class MovieList{
    poster_path: string;
    title: string;
    overview: string;
    release_date: Date;
    vote_average:number;
    vote_count:number;
    id:number;
    index:number
}

export class MoviePage{
    page:number;
    results: MovieList[];
}