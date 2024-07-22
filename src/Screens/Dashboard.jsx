import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/authContext.jsx';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db } from '../config/Firebase';
import { collection, query, where, onSnapshot, doc, getDoc } from 'firebase/firestore';
import CreateBlogModal from "./CreateBlogNodel.jsx"
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const [userName, setUserName] = useState('User');

  useEffect(() => {
    if (currentUser) {
      // Fetch user data from Firestore
      const fetchUserData = async () => {
        try {
          const userDocRef = doc(db, 'users', currentUser.uid);
          const userDocSnap = await getDoc(userDocRef);
          if (userDocSnap.exists()) {
            setUserName(userDocSnap.data().name || 'User');
          } else {
            console.log("No such document!");
            setUserName('User');
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserName('User');
        }
      };
      fetchUserData();

      // Fetch blogs
      const q = query(collection(db, 'blogs'), where('authorId', '==', currentUser.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const blogsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogsData);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Successfully logged out!');
      navigate('/');
    } catch (error) {
      toast.error('Logout failed. Please try again.');
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="profile-section">
          <img
            src={currentUser?.photoURL || 'https://via.placeholder.com/50'}
            alt="Profile"
            className="profile-icon"
          />
          <h2>{userName}</h2>
        </div>
        <div className="buttons">
          <button className="create-blog-btn" onClick={() => setShowModal(true)}>Create Blog</button>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      </div>
      <div className="main-content">
        <h2>Your Blogs</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Content</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map(blog => (
              <tr key={blog.id}>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.content}</td>
                <td>{blog.createdAt ? new Date(blog.createdAt.seconds * 1000).toLocaleString() : 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showModal && <CreateBlogModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Dashboard;