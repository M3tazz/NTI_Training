import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-student-card',
  standalone: true,
  templateUrl: './student-card-component.html',
  styleUrls: ['./student-card-component.css'],
})
export class StudentCardComponent {
  @Input() name!: string;
  @ViewChild('card') card!: ElementRef;

  changeColor(color: string) {
    this.card.nativeElement.style.background = color;
  }
}
