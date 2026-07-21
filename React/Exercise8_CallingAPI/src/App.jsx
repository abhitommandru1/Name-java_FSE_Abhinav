import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const API_BASE = 'https://jsonplaceholder.typicode.com';

function App() {
  return (
    <div className="app">
      <h1>Calling API with React</h1>
      <p className="intro">
        Both sections below call the same public test API
        (<code>{API_BASE}</code>) — one via the native <code>fetch</code> API,
        the other via <code>axios</code> — to compare the two approaches.
      </p>
      <FetchSection />
      <AxiosSection />
    </div>
  );
}

// --- Implementation of API interaction using the Fetch API ---
function FetchSection() {
  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function loadUsers() {
      try {
        const response = await fetch(`${API_BASE}/users?_limit=5`);
        // fetch() only rejects on a network failure — an HTTP error status
        // (404, 500...) still resolves, so `response.ok` must be checked manually.
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (!cancelled) {
          setUsers(data);
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      }
    }

    loadUsers();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section>
      <h2>Fetch API</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="error">Error: {error}</p>}
      {users && (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name} — {user.email}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

// --- Implementation of API interaction using Axios ---
function AxiosSection() {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    // Unlike fetch(), axios rejects the promise automatically on a non-2xx
    // status, and parses JSON into `response.data` without a manual .json() step.
    axios
      .get(`${API_BASE}/posts`, { params: { _limit: 5 }, signal: controller.signal })
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) return;
        setError(err.message);
        setLoading(false);
      });

    return () => controller.abort();
  }, []);

  return (
    <section>
      <h2>Axios</h2>
      {loading && <p>Loading posts...</p>}
      {error && <p className="error">Error: {error}</p>}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default App;
