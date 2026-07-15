import { useEffect, useState } from 'react';

// Functional component — the modern way, using Hooks for state and lifecycle.
// useState replaces this.state/this.setState; useEffect replaces componentDidMount.
function CounterFunctional() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('CounterFunctional mounted');
  }, []);

  const increment = () => setCount((prev) => prev + 1);

  return (
    <div className="counter-box">
      <h3>Functional Component</h3>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}

export default CounterFunctional;
