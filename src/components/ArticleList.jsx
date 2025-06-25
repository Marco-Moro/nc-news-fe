import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetch("https://nc-news-pdkt.onrender.com/api/articles")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fetch failed");
        }
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading articles...</p>;
  if (isError) return <p>Something went wrong.</p>;

  return (
    <div className="page-container">
      <section>
        <h2 className="articles-title">Articles</h2>
        <ul className="article-list">
          {articles.map((article) => (
            <li key={article.article_id} className="article-card">
              <Link
                to={`/articles/${article.article_id}`}
                className="article-link"
              >
                <h3>{article.title}</h3>
                <p>Author: {article.author}</p>
                <p>Topic: {article.topic}</p>
                <p>Votes: {article.votes}</p>
                <p>Comments: {article.comment_count}</p>
                <p>
                  Published: {new Date(article.created_at).toLocaleDateString()}
                </p>
                <img
                  src={article.article_img_url}
                  alt={article.title}
                  className="article-img"
                />
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ArticleList;
