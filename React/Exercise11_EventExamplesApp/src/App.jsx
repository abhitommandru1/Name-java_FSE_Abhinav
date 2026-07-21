import { useState } from 'react';
import CurrencyConvertor from './CurrencyConvertor';

function App() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');
  const [pressMessage, setPressMessage] = useState('');

  // The Increment button invokes multiple methods: increases the counter AND says hello.
  const increment = () => {
    setCount((c) => c + 1);
    sayHello();
  };

  const decrement = () => setCount((c) => c - 1);

  const sayHello = () => {
    setMessage('Hello! Counter was just incremented.');
  };

  // Say Welcome button invokes a function that takes 'welcome' as an argument.
  const sayGreeting = (greeting) => {
    setMessage(`Say ${greeting}!`);
  };

  // React wraps native DOM events in a SyntheticEvent for cross-browser consistency —
  // event.type below confirms this handler really did receive a (synthetic) event object.
  const onPress = (event) => {
    setPressMessage(`I was clicked (synthetic event type: ${event.type})`);
  };

  return (
    <div>
      <h1>eventexamplesapp</h1>

      <section>
        <h2>Counter</h2>
        <button type="button" onClick={increment}>Increment</button>
        <button type="button" onClick={decrement}>Decrement</button>
        <p>Count: {count}</p>
        <p>{message}</p>
      </section>

      <section>
        <button type="button" onClick={() => sayGreeting('welcome')}>Say Welcome</button>
      </section>

      <section>
        <button type="button" onClick={onPress}>Press Me</button>
        <p>{pressMessage}</p>
      </section>

      <CurrencyConvertor />
    </div>
  );
}

export default App;
