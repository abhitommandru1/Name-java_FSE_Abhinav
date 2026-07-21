import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

import { CourseService } from './course';
import { Course } from '../models/course.model';

describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
    { id: 2, name: 'Operating Systems', code: 'CS201', credits: 3, gradeStatus: 'pending' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Asserts there are no outstanding (unsatisfied) HTTP requests — catches tests that
    // fire an unexpected extra call.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getCourses() returns the courses from the expected URL', () => {
    service.getCourses().subscribe((courses) => {
      expect(courses.length).toBe(2);
      expect(courses[0].name).toBe('Data Structures');
    });

    const req = httpMock.expectOne('http://localhost:3000/courses');
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('getCourses() surfaces a friendly error on server failure', () => {
    service.getCourses().subscribe({
      next: () => fail('expected an error, not a value'),
      error: (err) => expect(err.message).toBe('Failed to load courses. Please try again.'),
    });

    // retry(2) re-issues the request twice more after the first failure — flush all three.
    for (let i = 0; i < 3; i++) {
      httpMock.expectOne('http://localhost:3000/courses').flush('server error', {
        status: 500,
        statusText: 'Internal Server Error',
      });
    }
  });
});
