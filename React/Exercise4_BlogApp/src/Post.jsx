import { Component } from 'react';

// A child component that can be made to throw during render, to demonstrate that
// componentDidCatch on the parent Post component actually catches a real error.
class MaybeFaultyChild extends Component {
  render() {
    if (this.props.shouldThrow) {
      throw new Error('Simulated rendering error in a child component');
    }
    return <p>Comment: {this.props.comment}</p>;
  }
}

class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      title: '',
      hasError: false,
    };
  }

  // componentDidMount fires once, right after the component is first inserted into the DOM —
  // the right place to kick off data loading.
  componentDidMount() {
    console.log('Post mounted — loading post data');
    // Simulate an async data load (e.g. a real app would fetch this from an API).
    setTimeout(() => {
      this.setState({ loaded: true, title: 'My First Blog Post' });
    }, 500);
  }

  // componentDidCatch is React's class-component error boundary hook — it catches errors
  // thrown during rendering anywhere in this component's child tree, and lets us render a
  // fallback UI instead of crashing the whole app.
  componentDidCatch(error, info) {
    console.error('Post caught an error from a child:', error.message, info.componentStack);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <p className="error">Something went wrong while rendering this post.</p>;
    }

    if (!this.state.loaded) {
      return <p>Loading post...</p>;
    }

    return (
      <div>
        <h2>{this.state.title}</h2>
        <MaybeFaultyChild comment="Great post!" shouldThrow={this.props.triggerError} />
      </div>
    );
  }
}

export default Post;
