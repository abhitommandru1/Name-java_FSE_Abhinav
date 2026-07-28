import { Component, computed, Input, signal } from '@angular/core';
import { StudentCardComponent } from '../student-card/student-card.component';
import { StudentService } from '../../services/student.service';

// Container component — injects StudentService directly (Dependency
// Injection) rather than receiving the list via @Input(), and derives the
// filtered view with computed(), Angular's equivalent of a memoized
// derived value.
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [StudentCardComponent],
  templateUrl: './student-list.component.html',
  styleUrl: './student-list.component.css',
})
export class StudentListComponent {
  private readonly _filter = signal('');

  @Input() set filter(value: string) {
    this._filter.set(value);
  }

  readonly filteredStudents = computed(() => {
    const term = this._filter().toLowerCase();
    return this.studentService.students().filter(
      (s) => s.name.toLowerCase().includes(term) || s.course.toLowerCase().includes(term)
    );
  });

  constructor(private studentService: StudentService) {}

  onDelete(id: number): void {
    this.studentService.deleteStudent(id);
  }
}
