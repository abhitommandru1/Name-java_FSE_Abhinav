import { useState } from 'react';
import './AddStudent.css';

// Functional component — demonstrates controlled form with local state
const AddStudent = ({ onAdd }) => {
  // Local state for form fields
  const [form, setForm] = useState({ name: '', course: '', grade: 'A' });
  const [error, setError] = useState('');

  // ES6 arrow function — generic change handler using computed property name
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.name.trim() || !form.course.trim()) {
      setError('Name and course are required.');
      return;
    }

    onAdd(form);
    setForm({ name: '', course: '', grade: 'A' });
    setError('');
  };

  return (
    <div className="add-student">
      <h2>Add New Student</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter student name"
          />
        </div>
        <div className="form-group">
          <label>Course</label>
          <input
            name="course"
            value={form.course}
            onChange={handleChange}
            placeholder="Enter course name"
          />
        </div>
        <div className="form-group">
          <label>Grade</label>
          <select name="grade" value={form.grade} onChange={handleChange}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
        </div>
        <button type="submit" className="btn-add">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
