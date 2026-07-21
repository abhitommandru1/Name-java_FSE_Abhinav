import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { Course } from '../../models/course.model';
import { loadCourses } from '../../store/course/course.actions';
import { selectEnrolledCourses } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-student-profile',
  imports: [NgFor, NgIf],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile implements OnInit {
  enrolledCourses: Course[] = [];

  constructor(private store: Store) {}

  ngOnInit(): void {
    // Ensure the course slice is populated (in case this is the first page visited),
    // so the cross-slice selectEnrolledCourses selector has course data to join against.
    this.store.dispatch(loadCourses());
    this.store.select(selectEnrolledCourses).subscribe((courses) => (this.enrolledCourses = courses));
  }
}
