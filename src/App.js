import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import NewsSearchForm from './components/NewSearchForm';

axios.defaults.headers.common['Authorization'] =
  'Bearer 4330ebfabc654a6992c2aa792f3173a3';

const APIfetchArticles = ({
  searchQuery = '',
  currentPage = 1,
  pageSize = 5,
} = {}) => {
  return axios
    .get(
      `https://newsapi.org/v2/everything?q=${searchQuery}&pageSize=${pageSize}&page=${currentPage}`,
    )
    .then(response => response.data.articles);
};

function App() {

  const [articles, setArticles] = useState([]);
  const [query, setQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (query) {
      const fetchArticles = () => {
        setIsLoading(true);
        APIfetchArticles({ searchQuery: query, currentPage })
          .then(responseArticles => {
            setArticles(prevArticles => [...prevArticles, ...responseArticles]);

          })
          .catch(error => setError(error.message))
          .finally(() => setIsLoading(false))
      };
      fetchArticles();
    }
  }, [query, currentPage]);

  const shouldRenderLoadMoreButton = articles.length > 0 && !isLoading;

  const nextPage = () => setCurrentPage(prevCurrentPage => prevCurrentPage + 1);

  const onChangeQuery = query => {
    setQuery(query);
    setCurrentPage(1);
    setArticles([]);
    setError(null);
  };
  return (
    <>
      {error && <h1>Ой ошибка, всё пропало!!!</h1>}

      <NewsSearchForm onSubmit={onChangeQuery} />

      <ul>
        {articles.map(({ title, url }) => (
          <li key={title}>
            <a href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </a>
          </li>
        ))}
      </ul>

      {shouldRenderLoadMoreButton && (
        <button type="button" onClick={nextPage}>
          Загрузить ещё
        </button>
      )}

      {isLoading && (
        <p style={{ fontSize: 24, display: 'flex', alignItems: 'center' }}>
          Загружаем...
          <span
            aria-label="Иконка"
            role="img"
            style={{ fontSize: 32, marginLeft: 10 }}
          >
            🧙‍♂️
          </span>
        </p>
      )}
    </>
  );
}

export default App;
