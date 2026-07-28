import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

export const selectCourseState = createFeatureSelector<CourseState>('course');

// Selectors are memoised — they only recompute when their input selectors' output changes,
// which is NgRx's key performance optimisation over recomputing on every state change.
export const selectAllCourses = createSelector(selectCourseState, (state) => state.courses);
export const selectCoursesLoading = createSelector(selectCourseState, (state) => state.loading);
export const selectCoursesError = createSelector(selectCourseState, (state) => state.error);
