import { ThemeProvider } from './ThemeContext';
import EmployeeList from './Components/EmployeeList';

function App() {
  return (
    <ThemeProvider>
      <h1>Employee Management App</h1>
      <EmployeeList />
    </ThemeProvider>
  );
}

export default App;
