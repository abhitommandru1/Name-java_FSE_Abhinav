import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Student } from '../../models/student.model';

// Presentational component — receives data via @Input(), emits events via
// @Output(). This is Angular's equivalent of React props + callback props.
@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.css',
})
export class StudentCardComponent {
  @Input({ required: true }) student!: Student;
  @Output() delete = new EventEmitter<number>();

  get gradeColor(): string {
    switch (this.student.grade) {
      case 'A':
        return '#27ae60';
      case 'B':
        return '#f39c12';
      default:
        return '#e74c3c';
    }
  }

  onDeleteClick(): void {
    this.delete.emit(this.student.id);
  }
}
