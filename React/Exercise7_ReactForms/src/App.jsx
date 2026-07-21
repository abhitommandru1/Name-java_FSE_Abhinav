import { useRef, useState } from 'react';
import './App.css';

function App() {
  // --- Controlled inputs ---
  const [form, setForm] = useState({ name: '', bio: '', role: 'student' });
  const [submitted, setSubmitted] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // --- Validation and displaying error messages ---
  const validate = (values) => {
    const next = {};
    if (!values.name.trim()) {
      next.name = 'Name is required.';
    }
    if (values.bio.trim().length > 0 && values.bio.trim().length < 10) {
      next.bio = 'Bio must be at least 10 characters if provided.';
    }
    return next;
  };

  const handleSubmit = (event) => {
    // Controlled form: React state (`form`) is the single source of truth,
    // so preventDefault() stops the browser's native full-page-reload submit.
    event.preventDefault();
    const validationErrors = validate(form);
    setErrors(validationErrors);
    setSubmitted(Object.keys(validationErrors).length === 0 ? form : null);
  };

  // --- Uncontrolled input (via ref, not state) ---
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState(null);
  const handleFileChange = () => {
    // Reading directly from the DOM node (fileInputRef.current), not from
    // React state on every keystroke — that's what makes this "uncontrolled".
    const file = fileInputRef.current?.files?.[0];
    setFileName(file ? file.name : null);
  };

  return (
    <div className="app">
      <h1>React Forms</h1>

      <section>
        <h2>Controlled inputs, validation, textarea, select</h2>
        <form onSubmit={handleSubmit} noValidate>
          <label>
            Name
            <input type="text" name="name" value={form.name} onChange={handleChange} />
          </label>
          {errors.name && <p className="error">{errors.name}</p>}

          <label>
            Bio
            <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} />
          </label>
          {errors.bio && <p className="error">{errors.bio}</p>}

          <label>
            Role
            <select name="role" value={form.role} onChange={handleChange}>
              <option value="student">Student</option>
              <option value="mentor">Mentor</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button type="submit">Submit</button>
        </form>

        {submitted && (
          <p className="success">
            Submitted: {submitted.name} ({submitted.role}) — {submitted.bio || 'no bio'}
          </p>
        )}
      </section>

      <section>
        <h2>Uncontrolled input</h2>
        <input type="file" ref={fileInputRef} onChange={handleFileChange} />
        <p>Chosen file: {fileName ?? '(none yet)'}</p>
      </section>
    </div>
  );
}

export default App;
