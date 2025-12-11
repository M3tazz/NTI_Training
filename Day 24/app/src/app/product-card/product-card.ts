import { Component } from '@angular/core';

@Component({
  selector: 'app-product-card',
  imports: [],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css',
})
export class ProductCard {
  productName = 'Wireless Headphones';
  productImageSrc = 'images/headphone.avif';
  productPrice = '$49';
  isLiked = false;
  markAsLiked() {
    this.isLiked = !this.isLiked;
  }
}
