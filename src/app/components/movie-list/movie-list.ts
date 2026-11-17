import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MovieService } from '../../services/movie-service';
import { Movie } from '../../interfaces/movie';
import { SearchBar } from '../search-bar/search-bar';

@Component({
  selector: 'app-movie-list',
  imports: [SearchBar],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit {

  private router = inject(Router);
  public movieService = inject(MovieService);

  ngOnInit(): void {
    this.loadAll();
  }

  private loadAll(): void {
    this.movieService.getMovieList().subscribe(movies => {
      this.movieService.movieList.set(movies);
    });
  }

  onSearch(title: string): void {
    if (title.trim() === '') {
      this.loadAll();
    } else {
      this.movieService.getMovieByTitle(title).subscribe(movies => {
        this.movieService.movieList.set(movies);
      });
    }
  }

  navigateTo(movie: Movie): void {
    this.router.navigate(['/', movie.id]);
  }
}