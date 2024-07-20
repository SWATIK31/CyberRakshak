import React from 'react';
import './VideoCard.css';

const VideoCard = ({ title, thumbnail, link }) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer" className="video-card">
      <img src={thumbnail} alt={title} className="video-thumbnail" />
      <h3 className="video-title">{title}</h3>
    </a>
  );
};

export default VideoCard;