import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student, StudentService } from '../core/student';
import { LoggerService } from '../core/logger';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  students: Student[] = [];

  constructor(private svc: StudentService, private logger: LoggerService) {}

  ngOnInit(): void {
    this.logger.log('Home init');
    this.students = this.svc.list();
  }

  onCreate(s: Omit<Student, 'id'>) {
    this.students = this.svc.add(s);
    this.logger.log('Student added');
  }

  onToggleActive(id: number) {
    this.students = this.svc.toggleActive(id);
    this.logger.log('Student toggled active');
  }

  ngOnDestroy(): void {
    this.logger.log('Home destroy');
  }
}
