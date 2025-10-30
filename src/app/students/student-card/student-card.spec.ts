import { ComponentFixture, TestBed } from '@angular/core/testing';
 import { StudentCardComponent } from './student-card';
 import { Student } from '../../core/student';
 import { StudentsModule } from '../students-module';
import { CommonModule } from '@angular/common';

 describe('StudentCardComponent', () => {
  let component: StudentCardComponent;
  let fixture: ComponentFixture<StudentCardComponent>;
  const mockStudent: Student = {
    id: 42,
    name: 'Eve',
    track: 'Front-end',
    active: true
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // imports: [StudentCardComponent]
      declarations: [StudentCardComponent],
      imports: [CommonModule]
    }).compileComponents();
    fixture = TestBed.createComponent(StudentCardComponent);
    component = fixture.componentInstance;
    component.student = mockStudent;
    fixture.detectChanges();
  });
  it('should render the student name', () => {
    const nameEl: HTMLElement = fixture.nativeElement.querySelector('.title');
    expect(nameEl?.textContent).toContain('Eve');
  });
  it('should emit toggle event with id', () => {
    spyOn(component.toggle, 'emit');
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.toggle.emit).toHaveBeenCalledWith(42);
  });
 });