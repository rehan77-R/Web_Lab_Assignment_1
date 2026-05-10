import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to My CRUD App</h1>
      <p>This is a simple CRUD application using React and Firebase!</p>
      <Link to="/create">
        <button style={{ margin: '10px', padding: '10px' }}>Create New Item</button>
      </Link>
      <Link to="/items">
        <button style={{ margin: '10px', padding: '10px' }}>View All Items</button>
      </Link>
    </div>
  );
}

export default Home;