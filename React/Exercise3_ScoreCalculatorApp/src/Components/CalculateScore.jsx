import '../Stylesheets/mystyle.css';

// Functional component accepting Name, School, Total and goal (number of subjects) as props,
// to calculate and display the average score of a student.
function CalculateScore({ name, school, total, goal }) {
  const average = (total / goal).toFixed(2);

  return (
    <div className="score-card">
      <h2>Student Score Report</h2>
      <p>Name: {name}</p>
      <p>School: {school}</p>
      <p>Total Marks: {total}</p>
      <p>Number of Subjects: {goal}</p>
      <p className="average">Average Score: {average}</p>
    </div>
  );
}

export default CalculateScore;
