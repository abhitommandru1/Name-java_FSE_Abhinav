import { useState } from 'react';
import './App.css';

const initialTasks = [
  { id: 1, text: 'Buy milk' },
  { id: 2, text: 'Walk the dog' },
  { id: 3, text: 'Write report' },
];

// Each item has an *uncontrolled* input (defaultValue, not value) so that typed-in text
// lives in the DOM node itself, not in React state — this is what makes the key bug
// visible: if React reuses the wrong DOM node for the wrong item, the typed text stays
// attached to the wrong list item.
function TaskItem({ text }) {
  return (
    <li>
      <input type="text" defaultValue={text} />
    </li>
  );
}

function App() {
  const [tasks, setTasks] = useState(initialTasks);

  const removeFirst = () => setTasks((prev) => prev.slice(1));
  const reset = () => setTasks(initialTasks);

  return (
    <div className="app">
      <h1>Lists and Keys</h1>
      <p>
        Type something into any input below, then click "Remove first task" and watch
        what happens to the typed text in each list.
      </p>
      <div className="controls">
        <button onClick={removeFirst}>Remove first task</button>
        <button onClick={reset}>Reset</button>
      </div>

      <div className="columns">
        <div>
          <h2>Keyed by array index (buggy)</h2>
          {/* Using the array index as key is a common mistake: when an item is
              removed/reordered, React matches DOM nodes by key/position, not by
              identity — so the typed text can end up attached to the wrong task. */}
          <ul>
            {tasks.map((task, index) => (
              <TaskItem key={index} text={task.text} />
            ))}
          </ul>
        </div>

        <div>
          <h2>Keyed by stable id (correct)</h2>
          <ul>
            {tasks.map((task) => (
              <TaskItem key={task.id} text={task.text} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
