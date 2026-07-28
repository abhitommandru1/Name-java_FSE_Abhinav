import { useState } from 'react';

function ComplaintRegister() {
  // Controlled component: React state is the single source of truth for every field.
  const [form, setForm] = useState({ name: '', subject: '', description: '' });
  const [complaints, setComplaints] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setComplaints((prev) => [...prev, form]);
    setForm({ name: '', subject: '', description: '' });
  };

  return (
    <div>
      <h2>ComplaintRegister</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            Name
            <input type="text" name="name" value={form.name} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Subject
            <input type="text" name="subject" value={form.subject} onChange={handleChange} required />
          </label>
        </div>
        <div>
          <label>
            Description
            <textarea name="description" value={form.description} onChange={handleChange} required />
          </label>
        </div>
        <button type="submit">Raise Complaint</button>
      </form>

      <h3>Raised Complaints</h3>
      <ul>
        {complaints.map((c, i) => (
          <li key={i}>{c.subject} — {c.name}: {c.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default ComplaintRegister;
