import { useState } from "react";

function CommentForm({ article_id, addComment }) {
  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (commentText.trim() === "") {
      setMessage("Comment cannot be empty.");
      return;
    }

    setIsSubmitting(true);
    setMessage("");

    fetch(
      `https://nc-news-pdkt.onrender.com/api/articles/${article_id}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "butter_bridge",
          body: commentText,
        }),
      }
    )
      .then((res) => {
        if (!res.ok) {
          throw new Error("Posting comment failed.");
        }
        return res.json();
      })
      .then((data) => {
        setMessage("Comment posted successfully!");
        setCommentText("");
        addComment(data.comment);
      })
      .catch(() => {
        setMessage("There was a problem posting your comment.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Write your comment..."
        rows="4"
        cols="50"
      ></textarea>
      <button
        type="submit"
        disabled={isSubmitting || commentText.trim() === ""}
      >
        {isSubmitting ? "Submitting..." : "Post Comment"}
      </button>
      {message && <p>{message}</p>}
    </form>
  );
}

export default CommentForm;
