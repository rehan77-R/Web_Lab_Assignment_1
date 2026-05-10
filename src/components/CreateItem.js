import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';

function CreateItem() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'items'), {
        title: title,
        description: description,
      });
      alert('Item created successfully!');
      navigate('/items');
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Create New Item</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" style={{ padding: '10px 20px' }}>Create Item</button>
      </form>
    </div>
  );
}

export default CreateItem;