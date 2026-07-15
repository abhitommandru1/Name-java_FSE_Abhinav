import CounterClass from './components/CounterClass';
import CounterFunctional from './components/CounterFunctional';
import './App.css';

function App() {
  return (
    <div className="app">
      <h1>Class vs Functional Components</h1>
      <p>Same behavior (a click counter), two different component styles.</p>
      <div className="counters">
        <CounterClass />
        <CounterFunctional />
      </div>
    </div>
  );
}

export default App;
