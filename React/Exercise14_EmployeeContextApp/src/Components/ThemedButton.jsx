import { useContext } from 'react';
import { ThemeContext } from '../ThemeContext';

// Consumer: reads the theme straight from context, without receiving it as a prop from its
// immediate parent — it could be nested arbitrarily deep and still work.
function ThemedButton({ label, onClick }) {
  const { theme } = useContext(ThemeContext);

  const style =
    theme === 'light'
      ? { background: '#fff', color: '#111', border: '1px solid #ccc' }
      : { background: '#222', color: '#fff', border: '1px solid #555' };

  return (
    <button type="button" style={{ ...style, padding: '8px 16px', margin: '4px' }} onClick={onClick}>
      {label}
    </button>
  );
}

export default ThemedButton;
