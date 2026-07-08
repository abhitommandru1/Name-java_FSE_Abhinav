// Functional component — receives props from StudentList
const StudentCard = ({ student, onDelete }) => {
  // ES6 destructuring of props
  const { id, name, course, grade } = student;

  const gradeColor = grade === 'A' ? '#27ae60' : grade === 'B' ? '#f39c12' : '#e74c3c';

  return (
    <div className="student-card">
      <div className="card-info">
        <h3>{name}</h3>
        <p>Course: <strong>{course}</strong></p>
        <p>Grade: <strong style={{ color: gradeColor }}>{grade}</strong></p>
      </div>
      <button className="btn-delete" onClick={() => onDelete(id)}>
        Delete
      </button>
    </div>
  );
};

export default StudentCard;
