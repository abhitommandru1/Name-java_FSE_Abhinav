import './App.css';

// --- ES6: Classes and class inheritance ---
class Animal {
  constructor(name) {
    this.name = name;
  }
  speak() {
    return `${this.name} makes a sound.`;
  }
}

class Dog extends Animal {
  speak() {
    // `super.speak()` calls the parent class's method — class inheritance.
    return `${super.speak()} Specifically, ${this.name} barks.`;
  }
}

const dog = new Dog('Rex');

// --- ES6: arrow functions and `this` ---
class Counter {
  constructor() {
    this.count = 0;
    // Arrow function captures `this` from the enclosing scope (the constructor,
    // i.e. the instance) lexically — it does NOT get its own `this`.
    this.incrementArrow = () => {
      this.count++;
      return this.count;
    };
  }

  // A regular method's `this` depends on how it's called — if detached from the
  // instance (e.g. passed as a callback), `this` would be undefined/wrong.
  incrementRegular() {
    this.count++;
    return this.count;
  }
}

const counter = new Counter();
const detachedArrow = counter.incrementArrow; // still works: `this` is lexically bound
const arrowResult = detachedArrow(); // 1

// --- ES6: var vs let vs const scoping ---
function scopeDemo() {
  var varScoped = 'var: function-scoped';
  let letScoped = 'let: block-scoped';
  const constScoped = 'const: block-scoped, cannot be reassigned';

  if (true) {
    var varInsideBlock = 'still visible outside the if-block';
    let letInsideBlock = 'NOT visible outside the if-block';
  }

  // varInsideBlock is accessible here; letInsideBlock would throw a ReferenceError if used.
  return { varScoped, letScoped, constScoped, varInsideBlock };
}

const scopeResult = scopeDemo();

function App() {
  const inlineStyle = { color: '#2980b9', fontWeight: 'bold' };

  return (
    <div className="app">
      <h1>ES6 and JSX Fundamentals</h1>

      <section>
        <h2>Class inheritance</h2>
        {/* Nested JSX elements */}
        <p>{dog.speak()}</p>
      </section>

      <section>
        <h2>Arrow functions and `this`</h2>
        <p>Detached arrow method result: {arrowResult}</p>
        <p>Regular method result (called correctly): {counter.incrementRegular()}</p>
      </section>

      <section>
        <h2>var / let / const scoping</h2>
        <ul>
          <li>{scopeResult.varScoped}</li>
          <li>{scopeResult.letScoped}</li>
          <li>{scopeResult.constScoped}</li>
          <li>var leaking out of a block: {scopeResult.varInsideBlock}</li>
        </ul>
      </section>

      <section>
        <h2>JSX attributes and styling</h2>
        {/* JSX attribute (className) + inline styling via a style object */}
        <p className="highlighted" style={inlineStyle}>
          This paragraph uses both a CSS class (JSX attribute) and inline styling
          (JSX style object).
        </p>
        <div data-testid="jsx-demo" title="a JSX attribute">
          Nested <strong>elements</strong> inside a <em>parent</em> element.
        </div>
      </section>
    </div>
  );
}

export default App;
