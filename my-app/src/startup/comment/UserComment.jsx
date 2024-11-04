import React from 'react';

const UserComment = ({ name, date, text, avatarSrc }) => (
  <article className="user-comment">
    <img loading="lazy" src={avatarSrc} alt={`${name}'s avatar`} className="user-avatar" />
    <div className="comment-content">
      <header className="comment-header">
        <h3 className="user-name">{name}</h3>
        <time className="comment-date">{date}</time>
      </header>
      <p className="comment-text">{text}</p>
    </div>
    <style jsx>{`
      .user-comment {
        display: flex;
        align-items: flex-start;
        gap: 20px;
        font-family: Manrope, sans-serif;
        flex-wrap: wrap;
      }
      .user-avatar {
        aspect-ratio: 1;
        object-fit: contain;
        object-position: center;
        width: 48px;
        border-radius: 50%;
      }
      .comment-content {
        border-radius: 10px;
        background-color: rgba(114, 97, 168, 1);
        display: flex;
        min-width: 240px;
        flex-direction: column;
        flex: 1;
        flex-basis: 0%;
        padding: 10px 20px;
      }
      .comment-header {
        display: flex;
        width: 100%;
        align-items: flex-start;
        gap: 20px;
        line-height: 1.6;
        flex-wrap: wrap;
      }
      .user-name {
        color: var(--Gray-900, #0b0f19);
        font-feature-settings: "liga" off, "clig" off;
        font-size: 16px;
        font-weight: 700;
        flex: 1;
        flex-basis: 0%;
        margin: 0;
      }
      .comment-date {
        font-feature-settings: "liga" off, "clig" off;
        font-size: 14px;
        color: var(--Gray-600, #9397ad);
        font-weight: 400;
        text-align: right;
      }
      .comment-text {
        color: var(--Gray-900, #0b0f19);
        font-feature-settings: "liga" off, "clig" off;
        font-size: 16px;
        font-weight: 400;
        line-height: 26px;
        margin: 0;
      }
      @media (max-width: 991px) {
        .comment-content,
        .comment-header,
        .user-name,
        .comment-text {
          max-width: 100%;
        }
      }
    `}</style>
  </article>
);

export default UserComment;