import React, { useState, useEffect } from 'react';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { Link } from 'react-router-dom';

function AllItems() {
  const [items, setItems] = useState([]);

  const fetchItems = async () => {
    const querySnapshot = await getDocs(collection(db, 'items'));
    const itemsList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setItems(itemsList);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, 'items', id));
    fetchItems();
  };

  return (
    <div className="container">
      <h2>All Items</h2>
      {items.length === 0 ? (
        <p>No items found!</p>
      ) : (
        items.map((item) => (
          <div key={item.id} className="card">
            <div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </div>
            <div className="card-buttons">
              <Link to={`/items/${item.id}`}>
                <button className="btn-primary">View</button>
              </Link>
              <Link to={`/edit/${item.id}`}>
                <button className="btn-secondary">Edit</button>
              </Link>
              <button
                onClick={() => handleDelete(item.id)}
                className="btn-danger"
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default AllItems;