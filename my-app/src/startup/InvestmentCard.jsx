import React from 'react';
import { Link } from 'react-router-dom';

function InvestmentCard({ company, date, amount }) {
  return (
    <Link to="/investor_profile" className="flex items-center p-4 border-b hover:bg-gray-100">
      <article className="investment-card">
        <div className="investment-card__details">
          <h3 className="investment-card__company">{company}</h3>
          <p className="investment-card__date">{date}</p>
        </div>
        <p className="investment-card__amount">{amount}</p>
        <style jsx>{`
          .investment-card {
            border-radius: 13px;
            background-color: rgba(245, 245, 245, 1);
            display: flex;
            gap: 20px;
            flex-wrap: wrap;
            justify-content: space-between;
            padding: 12px 55px;
            margin-bottom: 29px;
          }
          .investment-card__details {
            display: flex;
            flex-direction: column;
            color: rgba(21, 34, 60, 1);
          }
          .investment-card__company {
            font-weight: 500;
            font-size: 16px;
            margin: 0;
          }
          .investment-card__date {
            font-weight: 300;
            align-self: start;
            margin-top: 12px;
            font-size: 16px;
          }
          .investment-card__amount {
            color: rgba(45, 214, 131, 1);
            font-weight: 500;
            text-align: right;
            margin: auto 0;
            font-size: 16px;
          }
          @media (max-width: 991px) {
            .investment-card {
              max-width: 100%;
              margin-right: 4px;
              padding: 12px 20px;
            }
          }
        `}</style>
      </article>
    </Link>
  );
}

export default InvestmentCard;
