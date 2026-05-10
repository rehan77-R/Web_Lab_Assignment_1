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
    <div style={{ padding: '20px' }}>
      <h2>Edit Item</h2>
      <form onSubmit={handleUpdate}>
        <div>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{ display: 'block', margin: '10px 0', padding: '8px', width: '300px' }}
          />
        </div>
        <div>
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ display: 'block', margin: '10px 0', padding: '8px', width: '300px' }}
          />
        </div>
        <button type="submit" style={{ padding: '10px 20px' }}>Update Item</button>
      </form>
    </div>
  );
}

export default EditItem;