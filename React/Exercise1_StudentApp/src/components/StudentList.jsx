import StudentCard from './StudentCard';
import './StudentList.css';

// Functional component — demonstrates list rendering and conditional rendering
const StudentList = ({ students, onDelete }) => {
  if (students.length === 0) {
    return (
      <div className="student-list">
        <p className="empty-msg">No students found.</p>
      </div>
    );
  }

  return (
    <div className="student-list">
      <h2>Students ({students.length})</h2>
      {/* List rendering using .map() — each item needs a unique key */}
      {students.map(student => (
        <StudentCard key={student.id} student={student} onDelete={onDelete} />
      ))}
    </div>
  );
};

export default StudentList;
