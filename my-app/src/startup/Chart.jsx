import React from 'react';

function Chart() {
  return (
    <div className="chart-container">
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/389406e02be9c45d75eb5842a5e4459416753be7307d800a6b96a3d5ceb1a620?placeholderIfAbsent=true&apiKey=e0ca87f5e1974e589ad51a28eed298e2"
        alt="Financial metrics chart"
        className="chart-image"
      />
      <style jsx>{`
        .chart-container {
          flex: 3;
          margin-top:110px
        }
        .chart-image {
          width: 100%;
          height: auto;
          border-radius: 4px;
          object-fit: contain;
        }
        @media (max-width: 991px) {
          .chart-image {
            margin-top: 32px;
          }
        }
      `}</style>
    </div>
  );
}

export default Chart;