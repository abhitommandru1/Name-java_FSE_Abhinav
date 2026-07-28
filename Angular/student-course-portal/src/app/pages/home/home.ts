import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { Store } from '@ngrx/store';
import { NotificationCard } from '../../components/notification/notification';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses } from '../../store/course/course.selectors';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-home',
  imports: [FormsModule, NgIf, NotificationCard],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';

  coursesAvailable = 0;
  enrolledCount = 0;
  gpa = 3.8;

  constructor(private store: Store) {}

  // [property] is one-way: component -> DOM only. [(ngModel)] is two-way: DOM <-> component
  // (it's shorthand for [ngModel]="prop" (ngModelChange)="prop = $event").
  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    this.store.dispatch(loadCourses());
    // Reading from the same NgRx store slice that CourseList/CourseCard read/write —
    // enrolling in a course from CourseList is reflected here too, confirming the store
    // is the single shared source of truth (the same role EnrollmentService played in HO6,
    // now taken over by the store as of HO9).
    this.store.select(selectAllCourses).subscribe((courses) => (this.coursesAvailable = courses.length));
    this.store.select(selectEnrolledIds).subscribe((ids) => (this.enrolledCount = ids.length));
  }

  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }
}
