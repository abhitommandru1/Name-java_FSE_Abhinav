import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, retry, tap, throwError } from 'rxjs';
import { Course } from '../models/course.model';

const API_URL = 'http://localhost:3000/courses';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(API_URL).pipe(
      // json-server returns numeric ids as strings — normalize back to number to match
      // the Course model used throughout the rest of the app.
      map((courses) => courses.map((c) => ({ ...c, id: Number(c.id) }))),
      // tap is for side effects (logging) that must not alter the stream — never mutate
      // data inside tap, use map for that.
      tap((courses) => console.log('Courses loaded:', courses.length)),
      retry(2),
      catchError((err) => {
        console.error(err);
        return throwError(() => new Error('Failed to load courses. Please try again.'));
      }),
    );
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${API_URL}/${id}`).pipe(
      map((c) => ({ ...c, id: Number(c.id) })),
    );
  }

  // json-server (v1) assigns a random non-numeric id on POST unless one is supplied, which
  // would break the numeric-id contract the rest of the app relies on for PUT/DELETE by id
  // — the caller computes and supplies the next numeric id explicitly.
  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(API_URL, course).pipe(map((c) => ({ ...c, id: Number(c.id) })));
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http
      .put<Course>(`${API_URL}/${course.id}`, course)
      .pipe(map((c) => ({ ...c, id: Number(c.id) })));
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${API_URL}/${id}`);
  }
}
