# Week 5 – Angular Hands-on

**Module reference:** Skill "Angular" — row 48 of `DN - Java FSE Mandatory hands-on detail.xlsx`
(Filename: "Angular Hands-on", Name: "Hands-on in this document"). The spreadsheet points to
a hands-on lab document rather than named exercises, so this build mirrors the same domain
and depth as the mandatory React exercises (React/Exercise1_StudentApp) — a small Student
Management app — using Angular's own idioms instead of React's.

## App: `StudentApp`
Scaffolded with the Angular CLI (`ng new StudentApp --routing --style=css`), the same way
`React/Exercise1_StudentApp` was scaffolded with Vite.

## What it demonstrates (mapped to core Angular concepts)

| Concept | Where |
|---|---|
| Standalone components | Every `*.component.ts` (`standalone: true`, no `NgModule` needed) |
| Component composition | `app.component.html` renders `<app-student-list>` and `<app-add-student>` |
| `@Input()` / `@Output()` | `student-card.component.ts` receives `student`, emits `delete` |
| Dependency Injection | `StudentService` injected into `student-list` and `add-student` via constructor |
| Signals (reactive state) | `StudentService.students` is a `signal<Student[]>`; `student-list` derives a filtered view with `computed()` |
| New control-flow syntax | `@if` / `@for` in `student-list.component.html`, `add-student.component.html` |
| Two-way binding | `[(ngModel)]` on the search box and the add-student form (`FormsModule`) |
| Template-driven forms | `add-student.component.ts` uses `NgForm` + `form.resetForm()` |

## Why a service instead of prop-drilling
In the React version, `App.jsx` owned the `students` state with `useState` and passed it
down as props to `StudentList` and `AddStudent`. Angular's idiomatic equivalent is an
`@Injectable` service holding a `signal` — any component can inject `StudentService`
directly and read/mutate the shared state, without the parent component having to pass it
down manually. This is Dependency Injection, one of Angular's core architectural pillars
(and distinct from React, which has no built-in DI container).

## Running it
```bash
cd Angular/StudentApp
npm install
ng serve       # http://localhost:4200
ng build        # production build, output in dist/
```

## Key takeaways
- Angular is a full framework (routing, forms, DI, HTTP client all built in) versus React,
  which is a rendering library that leaves those choices to the ecosystem — this is the
  first concept difference to internalize coming from the React exercise.
- Signals (`signal()`, `computed()`) are Angular's modern reactivity model (stable since
  Angular 17), replacing the older `Zone.js` + manual change detection mental model for new
  code.
- `@Input()`/`@Output()` decorators are the direct analogue of React props and callback
  props — same one-way-data-down, events-up pattern, different syntax.
