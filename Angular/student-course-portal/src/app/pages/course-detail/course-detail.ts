import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { CourseService } from '../../services/course';
import { EnrollmentService, Student } from '../../services/enrollment';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-detail',
  imports: [NgIf, NgFor],
  templateUrl: './course-detail.html',
  styleUrl: './course-detail.css',
})
export class CourseDetail implements OnInit {
  course: Course | undefined;
  students: Student[] = [];

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // switchMap chains the course lookup into the enrolled-students lookup — if the id
    // changed again before the first pair of requests finished, switchMap cancels the
    // stale inner Observable so an out-of-order response can never overwrite newer data.
    this.courseService
      .getCourseById(id)
      .pipe(
        switchMap((course) => {
          this.course = course;
          return this.enrollmentService.getStudentsByCourse(course.id);
        }),
      )
      .subscribe((students) => (this.students = students));
  }
}
