import React from 'react';

const UserAvatar = ({ src, alt }) => {
  return (
    <div className="avatar-container">
      <div className="avatar-border" />
      <img loading="lazy" src={src} alt={alt} className="avatar-image" />
      <style jsx>{`
        .avatar-container {
          align-self: stretch;
          position: relative;
          display: flex;
          align-items: flex-start;
          gap: 13px;
          justify-content: flex-start;
          width: 59px;
          margin: auto 0;
        }
        .avatar-border {
          stroke-width: 2.682px;
          background-color: var(--Primary-Base-White, #fff);
          border-radius: 50%;
          z-index: 0;
          display: flex;
          width: 59px;
          height: 59px;
          fill: var(--Primary-Base-White, #fff);
          stroke: var(--Brand-Primary, #107bef);
          border: 3px solid rgba(16, 123, 239, 1);
        }
        .avatar-image {
          aspect-ratio: 1;
          object-fit: contain;
          object-position: center;
          width: 49px;
          border-radius: 50%;
          position: absolute;
          z-index: 1;
          right: 5px;
          bottom: 5px;
          height: 48px;
        }
      `}</style>
    </div>
  );
};

export default UserAvatar;