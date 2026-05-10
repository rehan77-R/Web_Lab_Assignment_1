import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container">
      <h1>Welcome to My CRUD App</h1>
      <p>This is a simple CRUD application using React and Firebase!</p>
      <div className="home-buttons">
        <Link to="/create">
          <button className="btn-primary">Create New Item</button>
        </Link>
        <Link to="/items">
          <button className="btn-secondary">View All Items</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;