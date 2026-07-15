import { useState } from 'react';
import './App.css';

// Prevents a component from rendering at all by returning null.
function WarningBanner({ show }) {
  if (!show) return null;
  return <div className="warning">Low stock warning!</div>;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [stockLow, setStockLow] = useState(true);

  // Element variable — build a JSX value in a variable, then render it.
  let greeting;
  if (isLoggedIn) {
    greeting = <span>Welcome back!</span>;
  } else {
    greeting = <span>Please sign in.</span>;
  }

  return (
    <div className="app">
      <h1>Conditional Rendering</h1>

      <section>
        <h2>1. Element variable</h2>
        {greeting}
      </section>

      <section>
        <h2>2. Inline if with &amp;&amp;</h2>
        {/* Renders the badge only when notifications > 0. Watch out: if notifications
            were 0, `{0 && <Badge/>}` would render the literal "0", not nothing —
            that's why we compare explicitly with `> 0`. */}
        {notifications > 0 && <span className="badge">{notifications} new</span>}
        <div>
          <button onClick={() => setNotifications((n) => n + 1)}>Add notification</button>
          <button onClick={() => setNotifications(0)}>Clear</button>
        </div>
      </section>

      <section>
        <h2>3. Inline if-else with ternary</h2>
        {isLoggedIn
          ? <button onClick={() => setIsLoggedIn(false)}>Log out</button>
          : <button onClick={() => setIsLoggedIn(true)}>Log in</button>}
      </section>

      <section>
        <h2>4. Preventing a component from rendering (return null)</h2>
        <WarningBanner show={stockLow} />
        <button onClick={() => setStockLow((s) => !s)}>Toggle stock warning</button>
      </section>
    </div>
  );
}

export default App;
