import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { StudentService } from '../../services/student.service';

// Template-driven form — two-way binding via [(ngModel)], the Angular
// equivalent of a React controlled input backed by useState.
@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-student.component.html',
  styleUrl: './add-student.component.css',
})
export class AddStudentComponent {
  name = '';
  course = '';
  grade: 'A' | 'B' | 'C' = 'A';
  error = '';

  constructor(private studentService: StudentService) {}

  onSubmit(form: NgForm): void {
    if (!this.name.trim() || !this.course.trim()) {
      this.error = 'Name and course are required.';
      return;
    }

    this.studentService.addStudent({ name: this.name, course: this.course, grade: this.grade });

    this.error = '';
    form.resetForm({ grade: 'A' });
  }
}
