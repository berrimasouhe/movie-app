import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-head-bar',
  imports: [FaIconComponent],
  templateUrl: './head-bar.html',
  styleUrl: './head-bar.css',
})
export class HeadBar {
  private router = inject(Router);
  faHeart = faHeart;

  goToWishlist(): void {
    this.router.navigate(['/wishlist']);
  }
}