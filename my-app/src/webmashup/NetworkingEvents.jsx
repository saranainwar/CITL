import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './nstyle.css'

const NewsFeed = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        console.log("Fetching news articles...");
        const response = await axios.get('http://localhost:3000/api/news');
        console.log(response.data.articles);
        setArticles(response.data.articles.slice(0, 15));
      } catch (err) {
        setError('Error fetching news articles');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading news articles...</p>
        <div className="progress-bar-container w-full bg-gray-200 h-1 mt-2">
          <div className="progress-bar bg-purple-500 h-1"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="news-container p-6 bg-orange-50">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Latest Startup & Investment News</h2>
      <ul>
        {articles.map((article, index) => (
          <li key={index} className="news-item p-4 mb-4 border-l-4 border-purple-500 bg-white shadow-lg">
            <h3 className="font-semibold text-orange-600">{article.title}</h3>
            <p className="text-sm text-purple-700">{new Date(article.publishedAt).toLocaleDateString()} - {article.source.name}</p>
            <p className="text-gray-700">{article.description}</p>
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-600 hover:text-orange-600 font-semibold"
            >
              Read More
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NewsFeed;
