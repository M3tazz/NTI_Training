import { Component, ContentChild, ElementRef } from '@angular/core';
import { CardBoxComponent } from '../card-box-component/card-box-component';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CardBoxComponent],
  templateUrl: './about.html',
  styleUrl: './about.css',
})
export class About {}
