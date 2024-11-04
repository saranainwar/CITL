import React from 'react';

const WideMetricCard = ({ title, value, chartSrc }) => {
  return (
    <section className="wide-metric-card">
      <div className="wide-metric-content">
        <h2 className="metric-title">{title}</h2>
        <p className="metric-value">{value}</p>
      </div>
      <img loading="lazy" src={chartSrc} alt={`Chart for ${title}`} className="wide-metric-chart" />
    </section>
  );
};

export default WideMetricCard;