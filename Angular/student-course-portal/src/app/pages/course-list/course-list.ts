import { Component, OnInit } from '@angular/core';
import { AsyncPipe, NgIf, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course';
import { loadCourses } from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesError, selectCoursesLoading } from '../../store/course/course.selectors';

@Component({
  selector: 'app-course-list',
  imports: [NgIf, NgFor, FormsModule, AsyncPipe, CourseCard],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit {
  courses$: Observable<Course[]>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  selectedCourseId: number | null = null;
  searchTerm = '';

  newCourseName = '';
  newCourseCode = '';

  constructor(
    private store: Store,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.isLoading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
  }

  ngOnInit(): void {
    this.searchTerm = this.route.snapshot.queryParamMap.get('search') ?? '';
    // Redux DevTools timeline: dispatching loadCourses() here triggers CourseEffects'
    // loadCourses$ effect, which calls CourseService.getCourses() and dispatches
    // loadCoursesSuccess/loadCoursesFailure — trace the whole flow in the DevTools panel.
    this.store.dispatch(loadCourses());
  }

  onSearchChange(): void {
    this.router.navigate(['courses'], {
      queryParams: this.searchTerm ? { search: this.searchTerm } : {},
    });
  }

  trackByCourseId(_index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    this.selectedCourseId = courseId;
  }

  addCourse(form: NgForm): void {
    if (!this.newCourseName || !this.newCourseCode) return;
    this.courses$.subscribe((courses) => {
      const nextId = courses.length ? Math.max(...courses.map((c) => c.id)) + 1 : 1;
      this.courseService
        .createCourse({ id: nextId, name: this.newCourseName, code: this.newCourseCode, credits: 3, gradeStatus: 'pending' })
        .subscribe(() => {
          this.newCourseName = '';
          this.newCourseCode = '';
          form.resetForm();
          this.store.dispatch(loadCourses());
        });
    }).unsubscribe();
  }

  bumpCredits(course: Course): void {
    this.courseService
      .updateCourse({ ...course, credits: course.credits + 1 })
      .subscribe(() => this.store.dispatch(loadCourses()));
  }

  deleteCourse(course: Course): void {
    this.courseService.deleteCourse(course.id).subscribe(() => this.store.dispatch(loadCourses()));
  }
}
