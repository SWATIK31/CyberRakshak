import React, { useState, useEffect } from 'react';
import { db } from '../config/Firebase';
import { collection, query, where, onSnapshot, addDoc, serverTimestamp, deleteDoc, getDocs } from 'firebase/firestore';
import { useAuth } from '../context/authContext.jsx';
import './BlogCard.css';
import { toast } from 'react-toastify';
import { FaComment, FaShare, FaThumbsUp, FaTimes } from 'react-icons/fa';
import Modal from 'react-modal';

const BlogCard = () => {
  const { currentUser } = useAuth();
  const [blogs, setBlogs] = useState([]);
  const [comment, setComment] = useState('');
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [comments, setComments] = useState([]);
  const [shareModalIsOpen, setShareModalIsOpen] = useState(false);
  const [currentBlogId, setCurrentBlogId] = useState(null);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    if (currentUser) {
      const q = query(collection(db, 'blogs'), where('authorId', '==', currentUser.uid));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const blogsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBlogs(blogsData);
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  useEffect(() => {
    const q = query(collection(db, 'comments'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const commentsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setComments(commentsData);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const q = query(collection(db, 'likes'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const likesData = snapshot.docs.reduce((acc, doc) => {
        const { blogId, userId } = doc.data();
        if (!acc[blogId]) acc[blogId] = [];
        acc[blogId].push(userId);
        return acc;
      }, {});
      setLikes(likesData);
    });

    return () => unsubscribe();
  }, []);

  const handleCommentSubmit = async (blogId) => {
    if (!comment.trim()) {
      toast.error('Comment cannot be empty.');
      return;
    }

    try {
      await addDoc(collection(db, 'comments'), {
        blogId,
        comment,
        author: currentUser.displayName,
        authorId: currentUser.uid,
        createdAt: serverTimestamp(),
      });
      setComment('');
      toast.success('Comment added successfully!');
    } catch (error) {
      toast.error('Failed to add comment. Please try again.');
      console.error('Error adding comment: ', error);
    }
  };

  const handleLike = async (blogId) => {
    if (!currentUser) {
      toast.error('You must be logged in to like a blog.');
      return;
    }

    const blogLikes = likes[blogId] || [];
    const userHasLiked = blogLikes.includes(currentUser.uid);

    try {
      if (userHasLiked) {
        const likeQuery = query(collection(db, 'likes'), where('blogId', '==', blogId), where('userId', '==', currentUser.uid));
        const snapshot = await getDocs(likeQuery);
        snapshot.forEach(async (doc) => {
          await deleteDoc(doc.ref);
        });
      } else {
        await addDoc(collection(db, 'likes'), {
          blogId,
          userId: currentUser.uid,
        });
      }
    } catch (error) {
      toast.error('Failed to update like. Please try again.');
      console.error('Error updating like: ', error);
    }
  };

  const filteredComments = (blogId) => {
    return comments.filter(comment => comment.blogId === blogId);
  };

  const openShareModal = (blogId) => {
    setCurrentBlogId(blogId);
    setShareModalIsOpen(true);
  };

  const closeShareModal = () => {
    setShareModalIsOpen(false);
  };

  const shareBlog = (platform) => {
    const blogUrl = `${window.location.origin}/blogs/${currentBlogId}`;
    let shareUrl = '';

    switch (platform) {
      case 'whatsapp':
        shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(blogUrl)}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodeURIComponent(blogUrl)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(blogUrl)}`;
        break;
      default:
        break;
    }

    window.open(shareUrl, '_blank');
    closeShareModal();
  };

  const closeCommentSection = () => {
    setSelectedBlog(null);
    setComment('');
  };

  return (
    <div>
      <h2 className="blog-heading">Blogs</h2>
      <div className="blog-card-container">
        {blogs.map(blog => (
          <div key={blog.id} className="blog-card-wrapper">
            <div className="blog-card">
              <h3>{blog.title}</h3>
              <p className="category">{blog.category}</p>
              <p className="content">{blog.content}</p>
              <p className="date">{blog.createdAt ? new Date(blog.createdAt.seconds * 1000).toLocaleString() : 'N/A'}</p>
              <div className="actions">
                <button className="comment_button" onClick={() => setSelectedBlog(selectedBlog === blog.id ? null : blog.id)}>
                  <FaComment /> Comment
                </button>
                <button className="share_button" onClick={() => openShareModal(blog.id)}>
                  <FaShare /> Share
                </button>
                <button className="like_button" onClick={() => handleLike(blog.id)}>
                  <FaThumbsUp /> Like {likes[blog.id]?.length || 0}
                </button>
              </div>
            </div>
            {selectedBlog === blog.id && (
              <div className="comment-section">
                <div className="comment-header">
                  <h4>Comments</h4>
                  <button className="close-button" onClick={closeCommentSection}>
                    <FaTimes />
                  </button>
                </div>
                <textarea
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <p className="commenting-as">Commenting as: {currentUser.displayName}</p>
                <button onClick={() => handleCommentSubmit(blog.id)}>Submit</button>
                <div className="comments-list">
                  {filteredComments(blog.id).map(comment => (
                    <p key={comment.id}><strong>{comment.author}:</strong> {comment.comment}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <Modal
        isOpen={shareModalIsOpen}
        onRequestClose={closeShareModal}
        contentLabel="Share Blog"
        className="share-modal"
        overlayClassName="share-modal-overlay"
      >
        <h2>Share Blog</h2>
        <button onClick={() => shareBlog('whatsapp')}>Share on WhatsApp</button>
        <button onClick={() => shareBlog('telegram')}>Share on Telegram</button>
        <button onClick={() => shareBlog('twitter')}>Share on Twitter</button>
        <button onClick={closeShareModal}>Close</button>
      </Modal>
    </div>
  );
};

export default BlogCard;
