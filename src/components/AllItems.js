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
    <div style={{ padding: '20px' }}>
      <h2>All Items</h2>
      {items.length === 0 ? (
        <p>No items found!</p>
      ) : (
        items.map((item) => (
          <div key={item.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            <Link to={`/items/${item.id}`}>
              <button style={{ margin: '5px' }}>View</button>
            </Link>
            <Link to={`/edit/${item.id}`}>
              <button style={{ margin: '5px' }}>Edit</button>
            </Link>
            <button
              onClick={() => handleDelete(item.id)}
              style={{ margin: '5px', background: 'red', color: 'white' }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default AllItems;