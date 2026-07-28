import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CoursesLayout } from './pages/courses-layout/courses-layout';
import { CourseList } from './pages/course-list/course-list';
import { CourseDetail } from './pages/course-detail/course-detail';
import { StudentProfile } from './pages/student-profile/student-profile';
import { NotFound } from './pages/not-found/not-found';
import { authGuard } from './guards/auth-guard';
import { unsavedChangesGuard } from './guards/unsaved-changes-guard';

export const routes: Routes = [
  { path: '', component: Home },

  // Nested routes: /courses (list) and /courses/:id (detail) share the CoursesLayout shell.
  {
    path: 'courses',
    component: CoursesLayout,
    children: [
      { path: '', component: CourseList },
      { path: ':id', component: CourseDetail },
    ],
  },

  { path: 'profile', component: StudentProfile, canActivate: [authGuard] },

  // Lazy loaded: loadComponent (the standalone-API equivalent of loadChildren + an NgModule)
  // downloads a separate JS chunk only the first time these routes are visited.
  {
    path: 'enroll',
    loadComponent: () =>
      import('./pages/enrollment-form/enrollment-form').then((m) => m.EnrollmentForm),
    canActivate: [authGuard],
  },
  {
    path: 'enroll-reactive',
    loadComponent: () =>
      import('./pages/reactive-enrollment-form/reactive-enrollment-form').then(
        (m) => m.ReactiveEnrollmentForm,
      ),
    canDeactivate: [unsavedChangesGuard],
  },

  // Wildcard route must be last — Angular matches routes in declaration order, and a
  // wildcard declared earlier would swallow every other route beneath it.
  { path: '**', component: NotFound },
];
