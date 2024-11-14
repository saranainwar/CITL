import React from 'react';
import UserAvatar from './UserAvatar';

const CommentInput = () => {
  return (
    <section className="comment-section">
      <div className="comment-input-container">
        <UserAvatar src="https://cdn.builder.io/api/v1/image/assets/TEMP/1151b8d93ccfa9625317ef762376338ec56795aeadcc879237a2ade4afca61d9?placeholderIfAbsent=true&apiKey=e0ca87f5e1974e589ad51a28eed298e2" alt="User avatar" />
        <form className="comment-form">
          <label htmlFor="commentInput" className="visually-hidden">Add a comment</label>
          <input
            type="text"
            id="commentInput"
            className="comment-input"
            placeholder="Add a comment"
            aria-label="Add a comment"
          />
          <button type="submit" className="post-button">Post</button>
        </form>
      </div>
      <style jsx>{`
        .comment-section {
          display: flex;
          max-width: 860px;
          flex-direction: column;
          justify-content: center;
          padding: 2px 0;
           margin-bottom:10px;
        }
        .comment-input-container {
          display: flex;
          margin-top: 4px;
          height: 67px;
          width: 100%;
          align-items: center;
          gap: 10px;
          justify-content: flex-start;
          flex-wrap: wrap;
         
        }
        @media (max-width: 991px) {
          .comment-input-container {
            max-width: 100%;
          }
        }
        .comment-form {
          align-items: center;
          border-radius: 30px;
          border: 1px solid var(--Gray-500, #b4b7c9);
          background-color: #f3f3f3;
          align-self: stretch;
          display: flex;
          min-width: 240px;
          gap: 10px;
          text-align: center;
          justify-content: flex-start;
          flex-wrap: wrap;
          flex: 1;
          flex-basis: 0%;
          margin: auto 0;
          padding: 15px;
          font: 600 16px/1.6 Manrope, -apple-system, Roboto, Helvetica, sans-serif;
        }
        @media (max-width: 991px) {
          .comment-form {
            max-width: 100%;
          }
        }
        .comment-input {
          font-feature-settings: "liga" off, "clig" off;
          align-self: stretch;
          min-width: 240px;
          gap: 10px;
          color: var(--Gray-700, #565973);
          flex: 1;
          margin: auto 0;
          background: transparent;
          border: none;
          outline: none;
        }
        @media (max-width: 991px) {
          .comment-input {
            max-width: 100%;
          }
        }
        .post-button {
          font-feature-settings: "liga" off, "clig" off;
          align-self: stretch;
          border-radius: 30px;
          background: var(--Brand-Primary, #107bef);
          color: var(--White, var(--Primary-Base-White, #fff));
          white-space: nowrap;
          gap: 10px;
          margin: auto 0;
          padding: 10px 30px;
          border: none;
          cursor: pointer;
        }
        @media (max-width: 991px) {
          .post-button {
            white-space: initial;
            padding: 10px 20px;
          }
        }
        .visually-hidden {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
      `}</style>
    </section>
  );
};

export default CommentInput;