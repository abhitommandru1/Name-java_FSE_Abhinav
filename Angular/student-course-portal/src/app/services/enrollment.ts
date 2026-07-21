import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, of } from 'rxjs';
import { CourseService } from './course';
import { Course } from '../models/course.model';

export interface Student {
  id: number;
  courseId: number;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [];

  // Service-to-service injection: EnrollmentService depends on CourseService to resolve
  // enrolled IDs into full Course objects.
  constructor(
    private courseService: CourseService,
    private http: HttpClient,
  ) {}

  getStudentsByCourse(courseId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`http://localhost:3000/students?courseId=${courseId}`);
  }

  // The methods below implement HO6's "service as shared data store" pattern. As of HO9,
  // the live UI (CourseCard, Home, StudentProfile) sources enrollment state from the NgRx
  // store instead (see store/enrollment/*) — kept here to demonstrate the pre-NgRx approach
  // this app evolved from.
  enroll(courseId: number): void {
    if (!this.enrolledCourseIds.includes(courseId)) {
      this.enrolledCourseIds.push(courseId);
    }
  }

  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter((id) => id !== courseId);
  }

  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  getEnrolledCourseIds(): number[] {
    return this.enrolledCourseIds;
  }

  // CourseService now talks HTTP, so resolving IDs -> Course objects is async too:
  // forkJoin runs one getCourseById() call per enrolled id and waits for all of them.
  getEnrolledCourses(): Observable<Course[]> {
    if (this.enrolledCourseIds.length === 0) {
      return of([]);
    }
    return forkJoin(this.enrolledCourseIds.map((id) => this.courseService.getCourseById(id)));
  }

  getEnrolledCount(): Observable<number> {
    return this.getEnrolledCourses().pipe(map((courses) => courses.length));
  }
}
