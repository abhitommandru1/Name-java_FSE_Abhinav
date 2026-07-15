import { Injectable, signal } from '@angular/core';
import { Student } from '../models/student.model';

const initialStudents: Student[] = [
  { id: 1, name: 'Alice', course: 'Java', grade: 'A' },
  { id: 2, name: 'Bob', course: 'Python', grade: 'B' },
  { id: 3, name: 'Charlie', course: 'Angular', grade: 'A' },
];

// Injectable service — Angular's mechanism for sharing state/logic across
// components via Dependency Injection, instead of passing props down a tree.
@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private nextId = initialStudents.length + 1;

  // Signal — Angular's reactive primitive; components that read it re-render
  // automatically when it changes.
  readonly students = signal<Student[]>(initialStudents);

  addStudent(student: Omit<Student, 'id'>): void {
    this.students.update((current) => [...current, { ...student, id: this.nextId++ }]);
  }

  deleteStudent(id: number): void {
    this.students.update((current) => current.filter((s) => s.id !== id));
  }
}
