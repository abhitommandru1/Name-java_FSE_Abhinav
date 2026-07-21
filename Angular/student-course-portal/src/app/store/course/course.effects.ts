import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';
import { CourseService } from '../../services/course';
import { loadCourses, loadCoursesFailure, loadCoursesSuccess } from './course.actions';

// Effects are the only place in NgRx where side effects (HTTP calls, navigation,
// localStorage) should happen — reducers must stay pure functions.
@Injectable()
export class CourseEffects {
  // inject() (not a constructor parameter) — class field initializers run before
  // constructor-parameter-property assignments, and createEffect()'s factory function runs
  // immediately at field-init time, so a constructor-injected `this.actions$` would still be
  // undefined at that point. inject() has no such ordering dependency.
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map((courses) => loadCoursesSuccess({ courses })),
          catchError((error) => of(loadCoursesFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
