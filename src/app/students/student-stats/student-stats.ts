import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Student, StudentService } from '../../core/student';

type Track = Student['track'];

interface TrackSummary {
  track: Track;
  total: number;
  active: number;
  inactive: number;
}

@Component({
  selector: 'app-student-stats',
  standalone: false,
  templateUrl: './student-stats.html',
  styleUrls: ['./student-stats.css']
})
export class StudentStatsComponent implements OnInit, OnDestroy {
  private readonly subs = new Subscription();

  readonly tracks: Track[] = ['Front-end', 'Back-end', 'Data', 'DevOps'];

  students: Student[] = [];
  summaries: TrackSummary[] = [];
  activeCount = 0;
  inactiveCount = 0;

  selectedTrack: Track | undefined;

  constructor(
    private readonly svc: StudentService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.students = this.svc.list();
    this.recomputeStats();

    const qpSub = this.route.queryParamMap.subscribe(params => {
      this.applyTrackFilter(params);
    });
    this.subs.add(qpSub);
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  get filteredStudents(): Student[] {
    if (!this.selectedTrack) {
      return this.students;
    }
    return this.students.filter(s => s.track === this.selectedTrack);
  }

  selectTrack(track?: Track): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: track ? { track } : { track: null },
      queryParamsHandling: 'merge'
    });
  }

  private applyTrackFilter(params: ParamMap): void {
    const raw = params.get('track');
    this.selectedTrack = this.isTrack(raw) ? raw : undefined;
  }

  private isTrack(value: string | null): value is Track {
    return !!value && this.tracks.includes(value as Track);
  }

  private recomputeStats(): void {
    const base = { total: 0, active: 0, inactive: 0 };
    const byTrack = new Map<Track, TrackSummary>();

    for (const track of this.tracks) {
      byTrack.set(track, { track, total: 0, active: 0, inactive: 0 });
    }

    for (const student of this.students) {
      const summary = byTrack.get(student.track);
      if (!summary) continue;
      summary.total += 1;
      summary.active += student.active ? 1 : 0;
      summary.inactive += student.active ? 0 : 1;
    }

    const summaryValues = Array.from(byTrack.values());
    this.summaries = summaryValues.filter(s => s.total > 0);

    const totals = summaryValues.reduce((acc, curr) => ({
      total: acc.total + curr.total,
      active: acc.active + curr.active,
      inactive: acc.inactive + curr.inactive
    }), base);

    this.activeCount = totals.active;
    this.inactiveCount = totals.inactive;
  }
}
