// ES6 class fields + arrow function, avoiding manual .bind(this) in a constructor.
import { Component } from 'react';

const players = [
  { id: 1, name: 'Virat Kohli', role: 'Batsman' },
  { id: 2, name: 'Jasprit Bumrah', role: 'Bowler' },
  { id: 3, name: 'Ravindra Jadeja', role: 'All-rounder' },
  { id: 4, name: 'Rishabh Pant', role: 'Wicket-keeper' },
];

class ListOfPlayers extends Component {
  // Arrow function class field: lexically binds `this`, so it can be passed as an event
  // handler (e.g. onClick={this.logTeamSize}) without losing its `this` context.
  logTeamSize = () => {
    console.log(`Team size: ${players.length}`);
  };

  render() {
    return (
      <div>
        <h2>List of Players</h2>
        <ul>
          {/* map(): ES6 array method that transforms each player object into a <li> element */}
          {players.map(({ id, name, role }) => (
            // Destructuring: pulling id/name/role directly out of each player object
            // instead of writing player.id / player.name / player.role.
            <li key={id}>
              {name} — {role}
            </li>
          ))}
        </ul>
        <button type="button" onClick={this.logTeamSize}>
          Log Team Size
        </button>
      </div>
    );
  }
}

export default ListOfPlayers;
