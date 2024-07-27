import React, { useState, useEffect, useRef } from 'react';
import { db } from '../config/Firebase';
import { collection, query, onSnapshot, addDoc, serverTimestamp, deleteDoc, getDocs, where } from 'firebase/firestore';
import { useAuth } from '../context/authContext.jsx';
import './BlogCard.css';
import { toast } from 'react-toastify';
import { FaComment, FaShare, FaThumbsUp, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
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
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const q = query(collection(db, 'blogs'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const blogsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBlogs(blogsData);
    });

    return () => unsubscribe();
  }, []);

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
    if (!currentUser) {
      toast.error('You must be logged in to comment.');
      return;
    }

    if (!comment.trim()) {
      toast.error('Comment cannot be empty.');
      return;
    }

    const authorName = currentUser.displayName ? currentUser.displayName : 'Anonymous';

    try {
      await addDoc(collection(db, 'comments'), {
        blogId,
        comment,
        author: authorName,
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
    try {
      const likeId = `${blogId}_anonymous`;
      const likeRef = collection(db, 'likes');
      const likeDoc = await getDocs(query(likeRef, where('id', '==', likeId)));

      if (likeDoc.empty) {
        await addDoc(likeRef, {
          id: likeId,
          blogId,
          createdAt: serverTimestamp(),
        });
      } else {
        await deleteDoc(likeDoc.docs[0].ref);
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

  const toggleCommentSection = (blogId) => {
    setSelectedBlog(selectedBlog === blogId ? null : blogId);
    setComment('');
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -scrollContainerRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: scrollContainerRef.current.offsetWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="blog-section">
      <h2 className="blog-heading">Blogs</h2>
      <div className="blog-scroll-container">
        <button className="scroll-button left" onClick={scrollLeft}><FaChevronLeft /></button>
        <div className="blog-card-container" ref={scrollContainerRef}>
          {blogs.map(blog => (
            <div key={blog.id} className={`blog-card-wrapper ${selectedBlog === blog.id ? 'expanded' : ''}`}>
              <div className="blog-card">
                <h3>{blog.title}</h3>
                <p className="category">{blog.category}</p>
                <p className="content">{blog.content}</p>
                <p className="date">{blog.createdAt ? new Date(blog.createdAt.seconds * 1000).toLocaleString() : 'N/A'}</p>
                <div className="actions">
                  <button className="comment_button" onClick={() => toggleCommentSection(blog.id)}>
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
                    <h4>Comments ({filteredComments(blog.id).length})</h4>
                    <button className="close-button" onClick={() => toggleCommentSection(blog.id)}>
                      <FaTimes />
                    </button>
                  </div>
                  <textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  <p className="commenting-as">Commenting as: {currentUser ? currentUser.displayName : 'Anonymous'}</p>
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
        <button className="scroll-button right" onClick={scrollRight}><FaChevronRight /></button>
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
