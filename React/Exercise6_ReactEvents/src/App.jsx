import { useState } from 'react';
import './App.css';

function App() {
  // --- React event object ---
  const [lastKey, setLastKey] = useState('(none yet)');
  const handleKeyDown = (event) => {
    // `event` here is React's SyntheticEvent, not the raw DOM event —
    // it wraps the native event but behaves consistently across browsers.
    setLastKey(event.key);
  };

  // --- Event handlers ---
  const [clickCount, setClickCount] = useState(0);
  const handleClick = () => setClickCount((c) => c + 1);

  // --- Passing arguments to event handlers ---
  const [selectedColor, setSelectedColor] = useState(null);
  const colors = ['red', 'green', 'blue'];
  const handleColorClick = (color, event) => {
    // Arrow-function wrapper in the JSX below is what lets us pass `color`
    // as an argument while still receiving the event object.
    setSelectedColor(color);
    event.currentTarget.blur();
  };

  return (
    <div className="app">
      <h1>React Events</h1>

      <section>
        <h2>React event object</h2>
        <input
          type="text"
          placeholder="Press any key..."
          onKeyDown={handleKeyDown}
        />
        <p>Last key pressed: <code>{lastKey}</code></p>
      </section>

      <section>
        <h2>Event handlers</h2>
        <button type="button" onClick={handleClick}>
          Clicked {clickCount} time{clickCount === 1 ? '' : 's'}
        </button>
      </section>

      <section>
        <h2>Passing arguments to event handlers</h2>
        <div className="color-row">
          {colors.map((color) => (
            <button
              key={color}
              type="button"
              style={{ background: color, color: '#fff' }}
              onClick={(event) => handleColorClick(color, event)}
            >
              {color}
            </button>
          ))}
        </div>
        <p>Selected: {selectedColor ?? '(none yet)'}</p>
      </section>
    </div>
  );
}

export default App;
