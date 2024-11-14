import React from 'react';
import MetricLabel from './MetricLabel';
import Chart from './Chart';

const metricData = [
  { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/c13293706cab84e445d935869d1229d90c3491dc7b16218297902c7fcbc3a794?placeholderIfAbsent=true&apiKey=e0ca87f5e1974e589ad51a28eed298e2', label: 'Gross Margin' },
  { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/23fb1315c436521793862a1a314f140aaa858b7f52b644e942d534a0ad090909?placeholderIfAbsent=true&apiKey=e0ca87f5e1974e589ad51a28eed298e2', label: 'Net Margin' },
  { icon: 'https://cdn.builder.io/api/v1/image/assets/TEMP/83ff085f21412c40ebeea814ad4956b7c5e2222d7641c264c63d54a49e8932cf?placeholderIfAbsent=true&apiKey=e0ca87f5e1974e589ad51a28eed298e2', label: 'Ebidta' }
];

function FinancialMetrics() {
  return (
    <section className="financial-metrics">
      <div className="metrics-container">
        <Chart />
        <div className="legend">
          <h2 className="legend-title">Labels</h2>
          <div className="metric-list">
            {metricData.map((metric, index) => (
              <MetricLabel
                key={index}
                icon={metric.icon}
                label={metric.label}
              />
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .financial-metrics {
          max-width: 531px;
          overflow: hidden;
        }
        .metrics-container {
          display: flex;
          gap: 20px;
        }
        .legend {
          display: flex;
          flex-direction: column;
          color: #000;
          font: 24px Inter, sans-serif;
          margin: auto 0;
        }
        .legend-title {
          font-weight: 600;
          margin: 0 0 24px;
        }
        .metric-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        @media (max-width: 991px) {
          .metrics-container {
            flex-direction: column;
            align-items: stretch;
            gap: 40px;
          }
          .legend {
            margin-top: 0;
          }
        }
      `}</style>
    </section>
  );
}

export default FinancialMetrics;