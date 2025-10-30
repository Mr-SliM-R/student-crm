import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Student } from '../../core/student';

@Component({
  selector: 'app-student-card',
  standalone: false,
  templateUrl: './student-card.html',
  styleUrls: ['./student-card.css']
})
export class StudentCardComponent implements OnInit, OnDestroy {
  @Input({ required: true }) student!: Student;
  @Output() toggle = new EventEmitter<number>();

  ngOnInit(): void {
    console.log(`[StudentCard] init: ${this.student?.name}`);
  }

  ngOnDestroy(): void {
    console.log(`[StudentCard] destroy: ${this.student?.name}`);
  }
}
