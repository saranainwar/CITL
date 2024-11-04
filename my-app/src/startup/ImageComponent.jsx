import React from 'react';

const ImageComponent = () => {
  return (
    <>
      <img
        loading="lazy"
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/c7cbbcb1e7992a89df4113ae81e8686ff35c026ca9d65aefa3e2edf7156d5854?placeholderIfAbsent=true&apiKey=e0ca87f5e1974e589ad51a28eed298e2"
        alt="Decorative image"
        className="rounded-image"
      />
      <style jsx>{`
        .rounded-image {
          aspect-ratio: 4.31;
          object-fit: contain;
          object-position: center;
          width: 95%;
          border-radius: 28px;
          margin-left:30px;
        }
      `}</style>
    </>
  );
};

export default ImageComponent;