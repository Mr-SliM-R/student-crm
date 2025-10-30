import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StudentListComponent } from './student-list/student-list';
import { StudentCardComponent } from './student-card/student-card';
import { AddStudentComponent } from './add-student/add-student';
import { StudentStatsComponent } from './student-stats/student-stats';

@NgModule({
  declarations: [
    StudentListComponent,
    StudentCardComponent,
    AddStudentComponent,
    StudentStatsComponent
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  exports: [StudentListComponent, AddStudentComponent, StudentStatsComponent]
})
export class StudentsModule {}
