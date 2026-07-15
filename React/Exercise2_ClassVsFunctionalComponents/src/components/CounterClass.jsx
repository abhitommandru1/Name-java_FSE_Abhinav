import { Component } from 'react';

// Class component — the pre-Hooks way of holding local state.
// Constructor initializes state; setState() triggers a re-render.
class CounterClass extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  }

  componentDidMount() {
    console.log('CounterClass mounted');
  }

  render() {
    return (
      <div className="counter-box">
        <h3>Class Component</h3>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}

export default CounterClass;
