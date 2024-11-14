import React from "react";

const SeamlessJourney = () => {
  return (
    <header className="seamless-journey">
      <h1 className="journey-title">A Seamless Journey for Startups and Investors</h1>
      <style>{`
        .seamless-journey {
          width: 100%;
          padding-top: 15px;
          margin-top:70px;
        }
        .journey-title {
          color: rgba(64, 46, 122, 1);
          text-align: center;
          font: 700 56px IBM Plex Serif, -apple-system, Roboto, Helvetica, sans-serif;
        }
        @media (max-width: 991px) {
          .journey-title {
            max-width: 100%;
            font-size: 40px;
          }
        }
      `}</style>
    </header>
  );
};

export default SeamlessJourney;
