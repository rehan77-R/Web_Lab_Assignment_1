import React, { useState, useEffect } from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useParams, useNavigate } from 'react-router-dom';

function EditItem() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      const docRef = doc(db, 'items', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTitle(docSnap.data().title);
        setDescription(docSnap.data().description);
      }
    };
    fetchItem();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, 'items', id), {
        title: title,
        description: description,
      });
      alert('Item updated successfully!');
      navigate('/items');
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };

  return (
    <div className="container">
      <h2>Edit Item</h2>
      <div className="form-box">
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
          />
          <div className="home-buttons">
            <button type="submit" className="btn-primary">Update Item</button>
            <button type="button" className="btn-secondary" onClick={() => navigate('/items')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditItem;