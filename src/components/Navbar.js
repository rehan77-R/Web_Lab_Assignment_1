import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: '#333', padding: '10px' }}>
      <Link to="/" style={{ color: 'white', margin: '10px' }}>Home</Link>
      <Link to="/create" style={{ color: 'white', margin: '10px' }}>Create Item</Link>
      <Link to="/items" style={{ color: 'white', margin: '10px' }}>All Items</Link>
    </nav>
  );
}

export default Navbar;
