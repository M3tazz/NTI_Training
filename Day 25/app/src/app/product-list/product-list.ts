import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-product-list',
  imports: [FormsModule],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  products: product[] = [
    {
      id: 1,
      title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
      price: 109.95,
      description: 'Your perfect pack for everyday use and walks in the forest...',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png',
      rating: { rate: 3.9, count: 120 },
      tags: ['backpack', 'laptop', 'outdoor'],
      isFeatured: true,
    },
    {
      id: 2,
      title: 'Mens Casual Premium Slim Fit T-Shirts',
      price: 22.3,
      description: 'Slim-fitting style, contrast raglan long sleeve...',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png',
      rating: { rate: 4.1, count: 259 },
      tags: ['t-shirt', 'casual', 'slim'],
      isFeatured: false,
    },
    {
      id: 3,
      title: 'Mens Cotton Jacket',
      price: 55.99,
      description: 'Great outerwear jackets for Spring/Autumn/Winter...',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png',
      rating: { rate: 4.7, count: 500 },
      tags: ['jacket', 'cotton', 'warm'],
      isFeatured: true,
    },
    {
      id: 4,
      title: 'Mens Casual Slim Fit',
      price: 15.99,
      description: 'The color could be slightly different...',
      category: "men's clothing",
      image: 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png',
      rating: { rate: 2.1, count: 430 },
      tags: ['slim', 'shirt', 'casual'],
      isFeatured: false,
    },
    {
      id: 5,
      title: "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
      price: 695,
      description: 'From our Legends Collection, the Naga was inspired...',
      category: 'jewelery',
      image: 'https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_t.png',
      rating: { rate: 4.6, count: 400 },
      tags: ['bracelet', 'gold', 'silver'],
      isFeatured: true,
    },
    {
      id: 6,
      title: 'Solid Gold Petite Micropave',
      price: 168,
      description: 'Satisfaction Guaranteed. Return or exchange...',
      category: 'jewelery',
      image: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_t.png',
      rating: { rate: 3.9, count: 70 },
      tags: ['ring', 'gold', 'micropave'],
      isFeatured: false,
    },
    {
      id: 7,
      title: 'White Gold Plated Princess',
      price: 9.99,
      description: 'Classic Created Wedding Engagement Solitaire...',
      category: 'jewelery',
      image: 'https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_t.png',
      rating: { rate: 3, count: 400 },
      tags: ['ring', 'wedding', 'princess'],
      isFeatured: false,
    },
    {
      id: 8,
      title: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
      price: 10.99,
      description: 'Rose Gold Plated Double Flared Tunnel Plug Earrings...',
      category: 'jewelery',
      image: 'https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_t.png',
      rating: { rate: 1.9, count: 100 },
      tags: ['earrings', 'rose gold', 'stainless'],
      isFeatured: false,
    },
    {
      id: 9,
      title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0',
      price: 64,
      description: 'USB 3.0 and USB 2.0 Compatibility Fast data transfers...',
      category: 'electronics',
      image: 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png',
      rating: { rate: 3.3, count: 203 },
      tags: ['storage', '2TB', 'usb'],
      isFeatured: true,
    },
    {
      id: 10,
      title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
      price: 109,
      description: 'Easy upgrade for faster boot up, shutdown...',
      category: 'electronics',
      image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png',
      rating: { rate: 2.9, count: 470 },
      tags: ['ssd', '1TB', 'internal'],
      isFeatured: false,
    },
  ];
  filterKeyword = '';
  x = 'mens';
  getColor(rate: number): string {
    if (rate >= 4) {
      return 'green';
    } else if (rate >= 3) {
      return 'orange';
    } else {
      return 'red';
    }
  }
}

interface product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: { rate: number; count: number };
  tags: string[];
  isFeatured: boolean;
}
