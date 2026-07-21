import { useState } from 'react';

const courses = [
  { id: 1, name: 'Java FSE Deep Skilling', enrolled: true },
  { id: 2, name: 'React Deep Skilling', enrolled: true },
  { id: 3, name: 'Cloud Fundamentals', enrolled: false },
];

function CourseDetails() {
  const [showAll, setShowAll] = useState(false);
  const visibleCourses = showAll ? courses : courses.filter((c) => c.enrolled);

  return (
    <section>
      <h2>Course Details</h2>
      <button type="button" onClick={() => setShowAll((prev) => !prev)}>
        {showAll ? 'Show enrolled only' : 'Show all courses'}
      </button>
      <ul>
        {visibleCourses.map((course) => (
          <li key={course.id}>
            {course.name} {course.enrolled ? '(Enrolled)' : '(Not enrolled)'}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CourseDetails;
