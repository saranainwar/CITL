import React from 'react';
import  './styles.css';

const MetaItem = ({ icon, count }) => (
  <div className="meta-item">
    <img loading="lazy" src={icon} alt="" className="meta-icon" />
    <div className="meta-count">{count}</div>
  </div>
);

const CommentCard = ({ author, date, text, likes, comments }) => {
  return (
    <article className="comment-card">
      <div className="comment-content">
       
        <div className="comment-body">
          <header className="comment-header">
            <h3 className="author-name">{author.name}</h3>
            <time className="comment-date">{date}</time>
          </header>
          <p className="comment-text">{text}</p>
          <footer className="comment-meta">
            <MetaItem icon="https://cdn.builder.io/api/v1/image/assets/TEMP/2414a0de62bfc719d34d9faad0aaf8389ec1719d454cb55539e00c86f9ebf6b8?placeholderIfAbsent=true&apiKey=e0ca87f5e1974e589ad51a28eed298e2" count={likes} />
            <MetaItem icon="https://cdn.builder.io/api/v1/image/assets/TEMP/bbec2a862089e984071c19c2088085b087ecdafc659db439b40429bec29efd6e?placeholderIfAbsent=true&apiKey=e0ca87f5e1974e589ad51a28eed298e2" count={comments} />
          </footer>
        </div>
      </div>
     
    </article>
  );
};

export default CommentCard;