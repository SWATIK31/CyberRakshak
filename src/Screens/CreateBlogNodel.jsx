import React, { useState } from 'react';
import { useAuth } from '../context/authContext.jsx';
import { db } from '../config/Firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';
import './CreateBlogModel.css';

const CreateBlogModal = ({ onClose }) => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');

  const handleAddPost = async () => {
    if (!title || !category || !content) {
      toast.error('All fields are required.');
      return;
    }

    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        category,
        content,
        author: currentUser.displayName,
        authorId: currentUser.uid,
        createdAt: serverTimestamp()
      });
      toast.success('Blog post added successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to add blog post. Please try again.');
      console.error('Error adding document: ', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create Blog</h2>
        <input 
          type="text" 
          placeholder="Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Category" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
        />
        <textarea 
          placeholder="Content" 
          value={content} 
          onChange={(e) => setContent(e.target.value)} 
        />
        <div className="modal-buttons">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleAddPost}>Add Post</button>
        </div>
      </div>
    </div>
  );
};

export default CreateBlogModal;