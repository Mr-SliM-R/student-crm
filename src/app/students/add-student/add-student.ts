import { Component, EventEmitter, Output } from '@angular/core';
import { Student } from '../../core/student';

@Component({
  selector: 'app-add-student',
  standalone: false,
  templateUrl: './add-student.html',
  styleUrls: ['./add-student.css']
})
export class AddStudentComponent {
  @Output() create = new EventEmitter<Omit<Student, 'id'>>();

  name = '';
  track: 'Front-end' | 'Back-end' | 'Data' | 'DevOps' = 'Front-end';
  active = true;

  submit() {
    const name = this.name.trim();
    if (!name) return;
    this.create.emit({ name, track: this.track, active: this.active });
    this.name = '';
    this.active = true;
  }
}
