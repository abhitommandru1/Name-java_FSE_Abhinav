# Angular Hands-On — Student Course Portal (rebuilt to match the real spec)

**Source:** `Angular_HandsOn.pdf` from https://github.com/seshadrimr/Digital-Nurture-JavaFSE
— a 10-hands-on progressive build (Angular v20), NOT the single generic app that previously
lived in `Angular/StudentApp`. That folder is left untouched; this is the correct, spec-matching
build, in `Angular/student-course-portal`.

## Why this exists
The original `StudentApp` folder (components, add/list students) doesn't correspond to any
hands-on in the real Angular exercise document — it was built without access to that document.
The real spec is a single app built incrementally across 10 hands-on: components → binding/
lifecycle → directives/pipes → template-driven forms → reactive forms → services/DI → routing/
guards/lazy-loading → HttpClient/interceptors → NgRx → unit tests.

## How to run it
Two processes, both from this folder:
```
npm install
./node_modules/.bin/json-server --watch db.json --port 3000   # mock backend (HO8+)
npm start                                                       # ng serve, http://localhost:4200
```
`npm test` runs the full Jasmine/Karma suite (34 specs, all passing).

**Note on json-server version:** pinned to `0.17.4` as a devDependency, not the `1.x` beta
that `npm install -g json-server` currently installs. The 1.x beta ignores a client-supplied
`id` on POST and generates a random string id instead, which breaks the numeric-id contract
used for `PUT`/`DELETE` by id in `CourseService`. Confirmed via direct `curl` testing during
verification — this isn't a guess.

## What each hands-on maps to, and what was verified live
All 10 were driven end-to-end with a headless browser (Playwright) against the real running
app + json-server — not just compiled, actually exercised — before being considered done.

| HO | What | Verified |
|----|------|----------|
| 1 | Project scaffold, header/home/course-list/student-profile components, `notes.txt` explaining 8 project files | Builds, all 4 components render |
| 2 | Interpolation, property/event/two-way binding, `ngOnInit`/`ngOnDestroy`/`ngOnChanges`, `@Input`/`@Output` on `CourseCard` | Search box live-binds, Enroll Now shows message, console logs on mount/destroy/card-change |
| 3 | `*ngIf`/`*ngFor`/`*ngSwitch`, `trackBy`, `[ngClass]`/`[ngStyle]`, custom `appHighlight` directive, custom `creditLabel` pipe | Loading state, grade-status badges, hover highlight, pipe output all confirmed in a real render |
| 4 | Template-driven enrollment form, `required`/`minlength`/`email`, `#ctrl="ngModel"` error messages, reset | Short-name error shown, valid submit shows success message |
| 5 | Reactive form via `FormBuilder`, custom sync validator (`noCourseCode`), custom async validator (email-taken simulation), `FormArray` for additional courses | XX-prefix error, pending→emailTaken async validation, dynamic array add/remove, submit enabled only when valid |
| 6 | `CourseService`/`EnrollmentService`/`NotificationService` (root vs component-scoped `providedIn`), service-to-service injection | Home and CourseList share one `CourseService` instance; enrolling updates both; component-scoped `NotificationService` resets per `Home` instance |
| 7 | Nested `/courses` + `/courses/:id` routes, query-param search, `AuthGuard` (`canActivate`), `CanDeactivate` guard, `loadComponent` lazy routes, wildcard 404 | Course detail by id, `?search=` in URL, unknown route → 404, dirty reactive form → real `confirm()` dialog blocking navigation, **lazy chunks confirmed in the production build output** (`enrollment-form` and `reactive-enrollment-form` as separate chunk files) |
| 8 | `CourseService`/`EnrollmentService` over `HttpClient` against json-server, full CRUD (GET/POST/PUT/DELETE), `map`/`tap`/`retry`/`catchError`/`switchMap`, 3 interceptors (auth header, global error handling, loading spinner) | Real POST/PUT/DELETE round-trips verified against json-server; Authorization header present on every request; `switchMap` chains course→enrolled-students lookups |
| 9 | NgRx store: `course` and `enrollment` slices, actions/reducer/selectors/effects, cross-slice `selectEnrolledCourses` | `loadCourses()` → effect → `loadCoursesSuccess` → selector → render, traced live; enrolling via `CourseCard` updates `Home`'s count and `StudentProfile`'s list through the same store |
| 10 | Jasmine/Karma unit tests: `CourseCard` (create/render/`@Output`/`ngOnChanges`), `CourseService` (`HttpClientTestingModule`, success + 500-retry-then-error), `CourseList` with `MockStore` (initial-state render + `store.setState` loading toggle) | `npm test` → 34/34 passing |

## Deliberate deviations from the literal spec text (and why)
- **Lazy loading via `loadComponent`, not an `NgModule` + `loadChildren`.** The whole app uses
  Angular's standalone-component API (the CLI's default since Angular 17, still default in
  v20) — introducing one NgModule just for lazy loading would be inconsistent with everything
  else in the app. `loadComponent` achieves the identical outcome the hands-on asks you to
  verify: "a separate JavaScript chunk file downloaded only when the route is first visited" —
  confirmed in the `ng build` output (`Lazy chunk files` section listing `enrollment-form` and
  `reactive-enrollment-form`).
- **A real `Document.confirm()` dialog for `CanDeactivate`**, per the spec's own instruction
  (`window.confirm(...)`), verified by intercepting the actual browser dialog via Playwright,
  not by mocking it away.
- **A dedicated mini CRUD UI in `CourseList`** (add-course form + `+1 Credit`/`Delete`
  buttons) for HO8's "test all four operations" — the enrollment form itself enrolls a student
  in an *existing* course by id, which isn't the right place to wire `createCourse()` (that
  would conceptually turn a student-enrollment form into a course-creation form).
