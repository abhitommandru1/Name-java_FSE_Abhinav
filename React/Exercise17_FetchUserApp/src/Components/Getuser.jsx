import { Component } from 'react';

class Getuser extends Component {
  constructor(props) {
    super(props);
    this.state = { user: null, error: null };
  }

  // componentDidMount is the recommended place to fetch data — it fires once, after the
  // component's initial render, so the fetch doesn't block first paint.
  async componentDidMount() {
    try {
      const response = await fetch('https://api.randomuser.me/');
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      const user = data.results[0];
      this.setState({ user });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  render() {
    const { user, error } = this.state;

    if (error) return <p className="error">Error: {error}</p>;
    if (!user) return <p>Loading user...</p>;

    return (
      <div>
        <img src={user.picture.large} alt={`${user.name.first} ${user.name.last}`} />
        <p>Title: {user.name.title}</p>
        <p>First name: {user.name.first}</p>
      </div>
    );
  }
}

export default Getuser;
