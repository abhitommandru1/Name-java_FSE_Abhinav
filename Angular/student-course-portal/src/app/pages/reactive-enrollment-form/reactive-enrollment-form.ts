import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { HasUnsavedChanges } from '../../guards/unsaved-changes-guard';

// Custom synchronous validator: rejects course codes that start with the disallowed 'XX' prefix.
function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (typeof value === 'string' && value.toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

@Component({
  selector: 'app-reactive-enrollment-form',
  imports: [ReactiveFormsModule, NgFor, NgIf],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements OnInit, HasUnsavedChanges {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: [
        '',
        [Validators.required, Validators.email],
        [this.simulateEmailCheck.bind(this)],
      ],
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]),
    });
  }

  // Async validator: fires only after all sync validators pass, to avoid unnecessary "API" calls.
  // Simulates a server-side "is this email already taken" check.
  simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const value = (control.value ?? '') as string;
        resolve(value.includes('test@') ? { emailTaken: true } : null);
      }, 800);
    });
  }

  // Typed getter — safer than repeatedly casting `enrollForm.get('additionalCourses')` to
  // FormArray inline in the template.
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  hasUnsavedChanges(): boolean {
    return this.enrollForm.dirty && !this.submitted;
  }

  onSubmit(): void {
    console.log('enrollForm.value:', this.enrollForm.value);
    console.log('enrollForm.getRawValue():', this.enrollForm.getRawValue());
    // .value excludes disabled controls; .getRawValue() includes every control regardless
    // of its enabled/disabled state — useful when a control is disabled but still needed.
    this.submitted = this.enrollForm.valid;
  }
}
