import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Course } from '../../models/course.model';
import { Highlight } from '../../directives/highlight';
import { CreditLabelPipe } from '../../pipes/credit-label-pipe';
import { enrollInCourse, unenrollFromCourse } from '../../store/enrollment/enrollment.actions';
import { selectEnrolledIds } from '../../store/enrollment/enrollment.selectors';

@Component({
  selector: 'app-course-card',
  imports: [NgClass, NgStyle, NgSwitch, NgSwitchCase, NgSwitchDefault, Highlight, CreditLabelPipe, RouterLink],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnInit, OnDestroy {
  @Input() course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  private enrolledIds: number[] = [];
  private sub?: Subscription;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.sub = this.store.select(selectEnrolledIds).subscribe((ids) => (this.enrolledIds = ids));
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  // ngOnChanges fires whenever an @Input-bound value changes (including on first render) —
  // logging previous/current lets us see exactly what changed and when.
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log(
        'CourseCard ngOnChanges — previous:', changes['course'].previousValue,
        'current:', changes['course'].currentValue,
      );
    }
  }

  get isEnrolled(): boolean {
    return this.enrolledIds.includes(this.course.id);
  }

  toggleExpanded(): void {
    this.isExpanded = !this.isExpanded;
  }

  // A getter keeps the ngClass expression in the template short and testable in isolation,
  // instead of inlining a growing object literal directly in the HTML.
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': this.course.credits >= 4,
      expanded: this.isExpanded,
    };
  }

  get borderColor(): string {
    switch (this.course.gradeStatus) {
      case 'passed': return 'green';
      case 'failed': return 'red';
      default: return 'grey';
    }
  }

  onEnrollClick(): void {
    // Dispatch to the NgRx store instead of calling EnrollmentService directly — the store
    // is now the single source of truth for enrollment state, shared via selectEnrolledIds.
    if (this.isEnrolled) {
      this.store.dispatch(unenrollFromCourse({ courseId: this.course.id }));
    } else {
      this.store.dispatch(enrollInCourse({ courseId: this.course.id }));
    }
    this.enrollRequested.emit(this.course.id);
  }
}
