import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";

function ArticleDetails() {
  const { article_id } = useParams();

  const [article, setArticle] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [voteError, setVoteError] = useState(null);
  const [comments, setComments] = useState([]);

  const addComment = (newComment) => {
    setComments((currComments) => [newComment, ...currComments]);
  };

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://nc-news-pdkt.onrender.com/api/articles/${article_id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Article not found!");
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

  useEffect(() => {
    if (!article.article_id) return;

    fetch(
      `https://nc-news-pdkt.onrender.com/api/articles/${article_id}/comments`
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fetch comments failed");
        }
        return res.json();
      })
      .then(({ comments }) => {
        setComments(comments);
      })
      .catch(() => {
        setError("Failed to load comments");
      });
  }, [article.article_id]);

  const handleVote = (increment) => {
    setVoteError(null);

    setArticle((currArticle) => ({
      ...currArticle,
      votes: currArticle.votes + increment,
    }));
    fetch(`https://nc-news-pdkt.onrender.com/api/articles/${article_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ inc_votes: increment }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Vote failed!");
        }
        return res.json();
      })
      .catch(() => {
        setVoteError("Something went wrong. Please try again later.");

        setArticle((currArticle) => ({
          ...currArticle,
          votes: currArticle.votes - increment,
        }));
      });
  };

  if (isLoading) return <p className="error-message">Loading article...</p>;
  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="article-details">
      <section>
        <h2 className="articles-title">{article.title}</h2>
        <div className="article-card">
          <p>Author: {article.author}</p>
          <p>Topic: {article.topic}</p>
          <p>Votes: {article.votes}</p>
          <div>
            <button onClick={() => handleVote(1)}>{"\u{1F44D}"}</button>
            <button onClick={() => handleVote(-1)}>{"\u{1F44E}"}</button>
          </div>
          {voteError && <p style={{ color: "red" }}>{voteError}</p>}
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
      {article.article_id && (
        <CommentForm article_id={article.article_id} addComment={addComment} />
      )}
      <CommentList comments={comments} setComments={setComments} />
    </div>
  );
}

export default ArticleDetails;
