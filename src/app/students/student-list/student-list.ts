import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../core/student';

@Component({
  selector: 'app-student-list',
  standalone: false,
  templateUrl: './student-list.html',
  styleUrls: ['./student-list.css']
})
export class StudentListComponent {
  @Input() students: Student[] = [];
  @Output() toggleActive = new EventEmitter<number>();
}
