import { AfterContentInit, Component, ContentChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-card-box',
  standalone: true,
  templateUrl: './card-box-component.html',
  styleUrls: ['./card-box-component.css'],
})
export class CardBoxComponent implements AfterContentInit {
  @ContentChild('para') para!: ElementRef;
  ngAfterContentInit(): void {
    if (this.para) console.log('my paragraph : ', this.para.nativeElement.textContent);
  }
}
