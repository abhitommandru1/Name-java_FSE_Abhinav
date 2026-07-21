import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

// The '[Course]' prefix groups actions by feature in the Redux DevTools timeline —
// filtering by '[Course]' shows only course-related dispatches.
export const loadCourses = createAction('[Course] Load Courses');
export const loadCoursesSuccess = createAction(
  '[Course] Load Courses Success',
  props<{ courses: Course[] }>(),
);
export const loadCoursesFailure = createAction(
  '[Course] Load Courses Failure',
  props<{ error: string }>(),
);
