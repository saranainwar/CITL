import React from 'react';
import InvestmentCard from './InvestmentCard';

const investmentData = [
  { company: 'Acme Inc.', date: 'January 2021', amount: '$500,000' },
  { company: 'Acme Inc.', date: 'January 2021', amount: '$500,000' },
  { company: 'Acme Inc.', date: 'January 2021', amount: '$500,000' }
];

function InvestorsHistory() {
  return (
    <section className="investors-history">
      <header className="investors-history__header">
        <h2 className="investors-history__title">
          Investors History on <span className="highlight">Pitchers</span>
        </h2>
        <button className="investors-history__view-all">View all</button>
      </header>
      <div className="investors-history__list">
        {investmentData.map((investment, index) => (
          <InvestmentCard key={index} {...investment} />
        ))}
      </div>
      <style jsx>{`
        .investors-history {
          display: flex;
          max-width: 534px;
          flex-direction: column;
          overflow: hidden;
          align-items: flex-start;
          font-family: Poppins, sans-serif;
          margin-left:130px;
          margin-top:50px
        }
        .investors-history__header {
          z-index: 10;
          display: flex;
          margin-top: -7px;
          gap: 40px 100px;
          flex-wrap: wrap;
        }
        .investors-history__title {
          color: rgba(64, 46, 122, 1);
          font-size: 22px;
          font-weight: 600;
        }
        .highlight {
          color: rgba(201, 88, 39, 1);
        }
        .investors-history__view-all {
          color: rgba(234, 149, 37, 1);
          font-size: 16px;
          font-weight: 500;
          background: none;
          border: none;
          cursor: pointer;
        }
        .investors-history__list {
          display: flex;
          margin-top: 44px;
          width: 100%;
          padding-left: 8px;
          flex-direction: column;
          font-size: 16px;
        }
        @media (max-width: 991px) {
          .investors-history__header {
            max-width: 100%;
          }
          .investors-history__list {
            max-width: 100%;
            margin-top: 40px;
          }
        }
      `}</style>
    </section>
  );
}

export default InvestorsHistory;