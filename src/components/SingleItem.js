import React, { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams, Link } from 'react-router-dom';

function SingleItem() {
  const [item, setItem] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      const docRef = doc(db, 'items', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setItem({ id: docSnap.id, ...docSnap.data() });
      }
    };
    fetchItem();
  }, [id]);

  if (!item) return <p style={{ padding: '20px' }}>Loading...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>{item.title}</h2>
      <p>{item.description}</p>
      <Link to={`/edit/${item.id}`}>
        <button style={{ margin: '5px' }}>Edit</button>
      </Link>
      <Link to="/items">
        <button style={{ margin: '5px' }}>Back to All Items</button>
      </Link>
    </div>
  );
}

export default SingleItem;