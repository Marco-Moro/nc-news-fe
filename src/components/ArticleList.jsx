import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ArticleList = () => {
  const { topic } = useParams();

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [sortBy, setSortBy] = useState("created_at");
  const [order, setOrder] = useState("desc");

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const params = new URLSearchParams();

    if (topic) {
      params.append("topic", topic);
    }
    params.append("sort_by", sortBy);
    params.append("order", order);

    const url = `https://nc-news-pdkt.onrender.com/api/articles?${params.toString()}`;

    fetch(url)
      .then((res) => {
        if (!res.ok) {
          throw new Error("No articles found for this topic.");
        }
        return res.json();
      })
      .then((data) => {
        setArticles(data.articles);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsError(err.message);
        setIsLoading(false);
      });
  }, [topic, sortBy, order]);

  if (isLoading) return <p>Loading articles...</p>;
  if (isError) return <p className="error-message">{isError}</p>;

  return (
    <div className="page-container">
      <section>
        <h2 className="articles-title">
          {topic ? `Articles about ${topic}` : "Articles"}
        </h2>

        <input
          type="text"
          placeholder="Search articles..."
          className="search-bar"
        />

        <div className="sort-controls">
          <label>
            Sort by:
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <option value="created_at">Date</option>
              <option value="comment_count">Comment Count</option>
              <option value="votes">Votes</option>
            </select>
          </label>

          <label>
            Order:
            <select value={order} onChange={(e) => setOrder(e.target.value)}>
              <option value="desc">Descending</option>
              <option value="asc">Ascending</option>
            </select>
          </label>
        </div>

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
