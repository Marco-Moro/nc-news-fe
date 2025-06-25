import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

function ArticleDetails() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://nc-news-pdkt.onrender.com/api/articles/${article_id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fetch failed");
        }
        return res.json();
      })
      .then(({ article }) => {
        setArticle(article);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [article_id]);

  if (isLoading) return <p>Loading article...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div className="page-container">
      <section>
        <h2 className="articles-title">{article.title}</h2>
        <div className="article-card">
          <p>Author: {article.author}</p>
          <p>Topic: {article.topic}</p>
          <p>Votes: {article.votes}</p>
          <p>Comments: {article.comment_count}</p>
          <p>Published: {new Date(article.created_at).toLocaleDateString()}</p>
          <img
            src={article.article_img_url}
            alt={article.title}
            className="article-img"
          />
          <p>{article.body}</p>
        </div>
      </section>
    </div>
  );
}

export default ArticleDetails;
