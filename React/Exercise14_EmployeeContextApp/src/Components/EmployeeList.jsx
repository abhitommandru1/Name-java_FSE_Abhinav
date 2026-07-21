import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';
import ThemedButton from './ThemedButton';

const employees = [
  { id: 1, name: 'Abhinav', role: 'Software Engineer' },
  { id: 2, name: 'Priya', role: 'QA Engineer' },
];

function EmployeeList() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div style={{ background: theme === 'light' ? '#f9f9f9' : '#111', color: theme === 'light' ? '#111' : '#f9f9f9', padding: 16 }}>
      <h2>Employee Management</h2>
      <p>Current theme: {theme}</p>
      <ThemedButton label="Toggle Theme" onClick={toggleTheme} />
      <ul>
        {employees.map((e) => (
          <li key={e.id}>{e.name} — {e.role} <ThemedButton label="View" onClick={() => {}} /></li>
        ))}
      </ul>
    </div>
  );
}

export default EmployeeList;
