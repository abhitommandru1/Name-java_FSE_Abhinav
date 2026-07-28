import { Component } from 'react';

// State (this.state) is owned and managed by the component itself, unlike Props which are
// passed in from a parent — entrycount/exitcount only ever change via this.setState() here.
class CountPeople extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entrycount: 0,
      exitcount: 0,
    };
  }

  UpdateEntry = () => {
    this.setState((prev) => ({ entrycount: prev.entrycount + 1 }));
  };

  UpdateExit = () => {
    this.setState((prev) => ({ exitcount: prev.exitcount + 1 }));
  };

  render() {
    return (
      <div>
        <h2>Mall Entry/Exit Counter</h2>
        <p>People who entered the mall: {this.state.entrycount}</p>
        <p>People who exited the mall: {this.state.exitcount}</p>
        <button type="button" onClick={this.UpdateEntry}>Entry</button>
        <button type="button" onClick={this.UpdateExit}>Exit</button>
      </div>
    );
  }
}

export default CountPeople;
