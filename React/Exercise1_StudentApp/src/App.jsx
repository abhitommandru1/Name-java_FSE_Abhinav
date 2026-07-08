import { useState } from 'react';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import './App.css';

// Initial student data (ES6 array)
const initialStudents = [
  { id: 1, name: 'Alice',   course: 'Java',   grade: 'A' },
  { id: 2, name: 'Bob',     course: 'Python',  grade: 'B' },
  { id: 3, name: 'Charlie', course: 'React',   grade: 'A' },
];

// Root component — manages shared state
function App() {
  const [students, setStudents] = useState(initialStudents);
  const [filter, setFilter]     = useState('');

  // Event handler: add new student
  const addStudent = (student) => {
    setStudents(prev => [...prev, { ...student, id: prev.length + 1 }]);
  };

  // Event handler: delete a student
  const deleteStudent = (id) => {
    setStudents(prev => prev.filter(s => s.id !== id));
  };

  // Derived value using ES6 filter + toLowerCase
  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(filter.toLowerCase()) ||
    s.course.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="app">
      <h1>Student Management App</h1>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by name or course..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>

      {/* Pass data (props) down to StudentList */}
      <StudentList students={filtered} onDelete={deleteStudent} />

      {/* Pass callback (props) down to AddStudent */}
      <AddStudent onAdd={addStudent} />
    </div>
  );
}

export default App;
