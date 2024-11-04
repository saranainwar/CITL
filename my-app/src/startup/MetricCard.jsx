import React from 'react';

const MetricCard = ({ title, value, chartSrc, altText }) => {
  return (
    <section className="metric-card">
      <div className="metric-content">
        <h2 className="metric-title">{title}</h2>
        <p className="metric-value">{value}</p>
      </div>
      <img loading="lazy" src={chartSrc} alt={altText} className="metric-chart" />
    </section>
  );
};

export default MetricCard;