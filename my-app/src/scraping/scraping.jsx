
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Treemap } from 'recharts';
import { BarChart as ChartIcon, PieChart as PieIcon, LineChart as LineIcon, Activity } from 'lucide-react';

const StockAnalysis = () => {
  const [stockData, setStockData] = useState([]);
  const [activeTab, setActiveTab] = useState('overview');

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#A020F0', '#00FA9A'];

  useEffect(() => {
    fetchStockData();
  }, []);

  const fetchStockData = async () => {
    try {
      const response = await fetch('/stock_data.csv');
      const data = await response.text();
      const parsedData = data.split('\n')
        .slice(1)
        .map(row => {
          const [ticker, companyName, currentPrice, percentChangeValue, percentChangePercent] = row.split(',');

          return {
            ticker: ticker ? ticker.trim() : '',
            companyName: companyName ? companyName.trim() : '',
            currentPrice: currentPrice ? parseFloat(currentPrice.replace(/,/g, '').trim()) : null,
            percentChangeValue: percentChangeValue ? parseFloat(percentChangeValue.trim()) : null,
            percentChangePercent: percentChangePercent ? parseFloat(percentChangePercent.replace(/[()%]/g, '').trim()) : null,
            marketCap: Math.random() * 1000000000 // Example random market cap
          };
        })
        .filter(item => item.ticker); // Remove any items with missing ticker

      console.log("Parsed Data:", parsedData); // Debugging line
      setStockData(parsedData);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border">
          <p className="font-bold">{payload[0].payload.companyName}</p>
          <p className="text-sm text-gray-600">Price: ${payload[0].value.toFixed(2)}</p>
          <p className="text-sm text-gray-600">
            Change: {payload[0].payload.percentChangePercent.toFixed(2)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const TabButton = ({ value, active, icon: Icon, children, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg ${
        active 
          ? 'bg-blue-500 text-white'
          : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
      }`}
    >
      <Icon className="w-4 h-4" />
      {children}
    </button>
  );

  const Card = ({ title, children }) => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      {children}
    </div>
  );

  return (
    <div className="p-6 space-y-6 bg-gray-50">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-6">Stock Market Analysis Dashboard</h1>
          
          <div className="flex gap-4 mb-6">
            <TabButton
              value="overview"
              active={activeTab === 'overview'}
              icon={Activity}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </TabButton>
            <TabButton
              value="price"
              active={activeTab === 'price'}
              icon={LineIcon}
              onClick={() => setActiveTab('price')}
            >
              Price Analysis
            </TabButton>
            <TabButton
              value="comparison"
              active={activeTab === 'comparison'}
              icon={ChartIcon}
              onClick={() => setActiveTab('comparison')}
            >
              Comparison
            </TabButton>
            <TabButton
              value="distribution"
              active={activeTab === 'distribution'}
              icon={PieIcon}
              onClick={() => setActiveTab('distribution')}
            >
              Distribution
            </TabButton>
          </div>

          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Price Overview">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={stockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="ticker" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line type="monotone" dataKey="currentPrice" stroke="#8884d8" strokeWidth={2} dot={{ r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>

              <Card title="Market Cap Distribution">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stockData.slice(0, 10)} // Only display the top 10 companies
                      dataKey="marketCap"
                      nameKey="companyName"
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      label
                    >
                      {stockData.slice(0, 10).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          )}

          {activeTab === 'price' && (
            <Card title="Detailed Price Analysis">
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={stockData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="ticker" />
                  <PolarRadiusAxis />
                  <Radar name="Price" dataKey="currentPrice" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
                  <Legend />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </Card>
          )}

          {activeTab === 'comparison' && (
            <Card title="Price Comparison">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={stockData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ticker" />
                  <YAxis />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="currentPrice" fill="#8884d8" />
                  <Bar dataKey="percentChangeValue" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          )}

          {activeTab === 'distribution' && (
            <Card title="Market Cap Distribution">
              <ResponsiveContainer width="100%" height={400}>
                <Treemap
                  data={stockData}
                  dataKey="marketCap"
                  nameKey="companyName"
                  aspect={4/3}
                  stroke="#fff"
                  fill="#8884d8"
                >
                  <Tooltip />
                </Treemap>
              </ResponsiveContainer>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default StockAnalysis;
