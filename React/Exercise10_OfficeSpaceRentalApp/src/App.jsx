// Demonstrates JSX: React.createElement() under the hood, nested elements, JSX
// attributes, and inline CSS via the style={{ ... }} object syntax.
const offices = [
  { id: 1, name: 'Downtown Loft', pricePerMonth: 45000, available: true },
  { id: 2, name: 'Riverside Suite', pricePerMonth: 60000, available: false },
];

function App() {
  const headingStyle = { color: '#2c3e50', textAlign: 'center' };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', padding: '20px' }}>
      <h1 style={headingStyle}>officespacerentalapp</h1>

      {offices.map((office) => (
        <div
          key={office.id}
          data-office-id={office.id}
          style={{
            border: '1px solid #ccc',
            borderRadius: '8px',
            padding: '12px 18px',
            marginBottom: '10px',
            backgroundColor: office.available ? '#eafaf1' : '#fdecea',
          }}
        >
          {/* Nested JSX elements */}
          <h2 style={{ margin: '0 0 4px' }}>{office.name}</h2>
          <p>
            Rent: <strong>&#8377;{office.pricePerMonth.toLocaleString('en-IN')}</strong> / month
          </p>
          <p>{office.available ? 'Available now' : 'Currently occupied'}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
