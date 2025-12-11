import { NgFor } from '@angular/common';
import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { StudentCardComponent } from '../student-card-component/student-card-component';

@Component({
  selector: 'app-student-list-component',
  imports: [StudentCardComponent,NgFor],
  templateUrl: './student-list-component.html',
  styleUrl: './student-list-component.css',
})
export class StudentListComponent {
  names = ['moataz', 'hamdy', 'ali'];
  @ViewChild(StudentCardComponent) first!: StudentCardComponent;
  @ViewChildren(StudentCardComponent) all!: QueryList<StudentCardComponent>;
  firstColor() {
    this.first.changeColor('red');
  }
  allColor() {
    this.all.forEach((x) => x.changeColor('black'));
  }
}
