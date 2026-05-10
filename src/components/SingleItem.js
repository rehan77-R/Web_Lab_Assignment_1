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

  if (!item) return <p className="container">Loading...</p>;

  return (
    <div className="container">
      <div className="form-box">
        <h2>{item.title}</h2>
        <p style={{ marginBottom: '20px', color: '#777' }}>{item.description}</p>
        <div className="home-buttons">
          <Link to={`/edit/${item.id}`}>
            <button className="btn-secondary">Edit</button>
          </Link>
          <Link to="/items">
            <button className="btn-primary">Back to All Items</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SingleItem;