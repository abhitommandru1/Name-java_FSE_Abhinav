import { useState } from 'react';

const INR_TO_EUR = 0.011;

function CurrencyConvertor() {
  const [rupees, setRupees] = useState(1000);
  const [euros, setEuros] = useState(null);

  // Handle the Click event of the button to invoke handleSubmit and convert rupees to euro.
  const handleSubmit = () => {
    setEuros((rupees * INR_TO_EUR).toFixed(2));
  };

  return (
    <div>
      <h2>CurrencyConvertor</h2>
      <label>
        Rupees:
        <input
          type="number"
          value={rupees}
          onChange={(e) => setRupees(Number(e.target.value))}
        />
      </label>
      <button type="button" onClick={handleSubmit}>Convert</button>
      {euros !== null && <p>{rupees} INR = {euros} EUR</p>}
    </div>
  );
}

export default CurrencyConvertor;
