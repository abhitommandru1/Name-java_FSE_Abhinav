import { useState } from 'react';
import Post from './Post';

function App() {
  const [triggerError, setTriggerError] = useState(false);

  return (
    <div>
      <h1>blogapp</h1>
      <Post triggerError={triggerError} />
      <button type="button" onClick={() => setTriggerError(true)}>
        Trigger child render error (test componentDidCatch)
      </button>
    </div>
  );
}

export default App;
