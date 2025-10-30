import { Injectable } from '@angular/core';

export interface Student {
  id: number;
  name: string;
  track: 'Front-end' | 'Back-end' | 'Data' | 'DevOps';
  active: boolean;
}

@Injectable({ providedIn: 'root' })
export class StudentService {
  private store: Student[] = [
    { id: 1, name: 'Alice', track: 'Front-end', active: true },
    { id: 2, name: 'Bob', track: 'Data', active: false }
  ];

  list(): Student[] { return [...this.store]; }

  add(s: Omit<Student, 'id'>): Student[] {
    const id = Math.max(0, ...this.store.map(x => x.id)) + 1;
    this.store = [...this.store, { id, ...s }];
    return this.list();
  }

  toggleActive(id: number): Student[] {
    this.store = this.store.map(s => s.id === id ? { ...s, active: !s.active } : s);
    return this.list();
  }
}
