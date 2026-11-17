import { inject, Injectable, signal } from "@angular/core";
import { environment } from "../../environments/environment.development";
import { map, Observable } from "rxjs";
import { MovieResponse } from "../interfaces/movie-response";
import { HttpClient } from "@angular/common/http";
import { Movie } from "../interfaces/movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private readonly http = inject(HttpClient);
  private readonly url = environment.url_api;
  private readonly key = environment.api_key;
  private readonly movieUrl = environment.url_movie_api;

  public movieList = signal<Movie[]>([]);
  public selectedMovie = signal<Movie | null>(null);
  public wishList = signal<Movie[]>([]);

  getMovieList(): Observable<Movie[]> {
    return this.http.get<MovieResponse>(
      `${this.url}?api_key=${this.key}`
    ).pipe(
      map(response => response.results)
    );
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.movieUrl}/${id}?api_key=${this.key}`);
  }

  getMovieByTitle(title: string): Observable<Movie[]> {
    return this.http.get<MovieResponse>(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(title)}&api_key=${this.key}`
    ).pipe(
      map(response => response.results)
    );
  }

  addToWishList(movie: Movie): void {
    this.wishList.update(list => [...list, movie]);
    localStorage.setItem('wishlist', JSON.stringify(this.wishList()));
  }
}