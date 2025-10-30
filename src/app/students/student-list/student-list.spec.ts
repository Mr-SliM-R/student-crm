import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { StudentListComponent } from './student-list';
import { StudentCardComponent } from '../student-card/student-card';
import { Student } from '../../core/student';

@Component({
  standalone: false,
  template: `
    <app-student-list
      [students]="students"
      (toggleActive)="onToggle($event)">
    </app-student-list>
  `
})
class HostComponent {
  students: Student[] = [
    { id: 1, name: 'Alice', track: 'Front-end', active: true },
    { id: 2, name: 'Bob', track: 'Data', active: false }
  ];
  lastToggle?: number;
  onToggle(id: number) { this.lastToggle = id; }
}

describe('StudentListComponent (hosted)', () => {
  let fixture: ComponentFixture<HostComponent>;
  let host: HostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HostComponent, StudentListComponent, StudentCardComponent],
      imports: [CommonModule, FormsModule]
    }).compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    host = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render a card for each student', () => {
    const cards = fixture.debugElement.queryAll(By.css('app-student-card'));
    expect(cards.length).toBe(2);
  }); // <-- this was missing

  it('should bubble toggle events', () => {
    const cardDebug = fixture.debugElement.queryAll(By.css('app-student-card'));
    cardDebug[0].triggerEventHandler('toggle', 1);
    expect(host.lastToggle).toBe(1);
  });
});
