import React from 'react';

function MetricLabel({ icon, label }) {
  return (
    <div className="metric-label">
      <img src={icon} alt="" className="metric-icon" />
      <span className="metric-text">{label}</span>
      <style jsx>{`
        .metric-label {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .metric-icon {
          width: 40px;
          height: 40px;
          object-fit: contain;
        }
        .metric-text {
          font-weight: 400;
        }
        .metric-container
        {
        margin-top:200px;}
    
      `}</style>
    </div>
  );
}

export default MetricLabel;