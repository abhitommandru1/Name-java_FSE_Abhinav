import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import TrainerList from './Components/TrainerList';
import About from './Components/About';

function App() {
  return (
    <BrowserRouter>
      <h1>trainersapp</h1>
      {/* Simple navigation menu using React Router's Link (updates the URL without a
          full page reload, unlike a plain <a> tag). */}
      <nav>
        <Link to="/">Trainers</Link> | <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<TrainerList />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
