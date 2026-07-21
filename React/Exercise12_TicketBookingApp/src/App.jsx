import { useState } from 'react';

const flights = [
  { id: 1, from: 'Bengaluru', to: 'Delhi', time: '06:00' },
  { id: 2, from: 'Chennai', to: 'Mumbai', time: '09:30' },
  { id: 3, from: 'Hyderabad', to: 'Kolkata', time: '14:15' },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleBook = (flight) => {
    alert(`Booked flight ${flight.from} -> ${flight.to} at ${flight.time}`);
  };

  return (
    <div>
      <h1>ticketbookingapp</h1>

      {/* Element variable pattern: the Login/Logout button element variable */}
      {isLoggedIn ? (
        <button type="button" onClick={() => setIsLoggedIn(false)}>Logout</button>
      ) : (
        <button type="button" onClick={() => setIsLoggedIn(true)}>Login</button>
      )}

      <h2>Available Flights</h2>
      <ul>
        {flights.map((flight) => (
          <li key={flight.id}>
            {flight.from} to {flight.to} at {flight.time}
            {/* Inline if with logical && operator: only logged-in users see the Book button */}
            {isLoggedIn && (
              <button type="button" onClick={() => handleBook(flight)} style={{ marginLeft: 8 }}>
                Book
              </button>
            )}
          </li>
        ))}
      </ul>

      {!isLoggedIn && <p>Log in to book a ticket. Guests can only browse flight details.</p>}
    </div>
  );
}

export default App;
