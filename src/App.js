import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import CreateItem from './components/CreateItem';
import AllItems from './components/AllItems';
import SingleItem from './components/SingleItem';
import EditItem from './components/EditItem';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateItem />} />
        <Route path="/items" element={<AllItems />} />
        <Route path="/items/:id" element={<SingleItem />} />
        <Route path="/edit/:id" element={<EditItem />} />
      </Routes>
    </Router>
  );
}

export default App;