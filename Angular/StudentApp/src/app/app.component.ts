import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { StudentListComponent } from './components/student-list/student-list.component';
import { AddStudentComponent } from './components/add-student/add-student.component';

// Root component — composes StudentListComponent and AddStudentComponent,
// and owns the search filter that is passed down via @Input().
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, StudentListComponent, AddStudentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Student Management App';
  filter = '';
}
