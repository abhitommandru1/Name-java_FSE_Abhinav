import { useState } from 'react';

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = 'Name is required';
  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!values.message.trim() || values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters';
  }
  return errors;
}

function MailRegister() {
  const [values, setValues] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitted(Object.keys(validationErrors).length === 0);
  };

  return (
    <div>
      <h2>Mail Registration</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div>
          <label>
            Name
            <input type="text" name="name" value={values.name} onChange={handleChange} />
          </label>
          {errors.name && <p className="error">{errors.name}</p>}
        </div>
        <div>
          <label>
            Email
            <input type="text" name="email" value={values.email} onChange={handleChange} />
          </label>
          {errors.email && <p className="error">{errors.email}</p>}
        </div>
        <div>
          <label>
            Message
            <textarea name="message" value={values.message} onChange={handleChange} />
          </label>
          {errors.message && <p className="error">{errors.message}</p>}
        </div>
        <button type="submit">Register</button>
      </form>
      {submitted && <p className="success">Registered successfully!</p>}
    </div>
  );
}

export default MailRegister;
