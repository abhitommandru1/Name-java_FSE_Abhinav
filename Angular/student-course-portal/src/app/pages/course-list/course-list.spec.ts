import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { CourseList } from './course-list';
import { Course } from '../../models/course.model';

const mockCourses: Course[] = [
  { id: 1, name: 'Data Structures', code: 'CS101', credits: 4, gradeStatus: 'passed' },
  { id: 2, name: 'Operating Systems', code: 'CS201', credits: 3, gradeStatus: 'pending' },
];

describe('CourseList', () => {
  let fixture: ComponentFixture<CourseList>;
  let store: MockStore;

  const initialState = {
    course: { courses: mockCourses, loading: false, error: null },
    enrollment: { enrolledCourseIds: [] },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideMockStore({ initialState }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseList);
    store = TestBed.inject(MockStore);
  });

  it('renders the course cards from the initial store state', () => {
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Data Structures');
    expect(text).toContain('Operating Systems');
  });

  it('shows the loading indicator when the store reports loading: true', () => {
    // MockStore lets the state be set directly, without running real reducers/effects —
    // useful for testing how a component reacts to a given state shape.
    store.setState({
      course: { courses: [], loading: true, error: null },
      enrollment: { enrolledCourseIds: [] },
    });
    fixture.detectChanges();
    const text = fixture.nativeElement.textContent as string;
    expect(text).toContain('Loading courses...');
  });
});
