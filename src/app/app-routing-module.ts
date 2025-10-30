import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { StudentStatsComponent } from './students/student-stats/student-stats';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'students/stats', component: StudentStatsComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
