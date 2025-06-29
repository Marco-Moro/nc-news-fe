import { useState } from "react";

function CommentList({ comments, setComments }) {
  const [deletingCommentId, setDeletingCommentId] = useState(null);
  const [deleteError, setDeleteError] = useState("");

  const handleDelete = (comment_id) => {
    setDeleteError("");
    setDeletingCommentId(comment_id);

    fetch(`https://nc-news-pdkt.onrender.com/api/comments/${comment_id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Delete failed");
        }
      })
      .then(() => {
        setComments((currComments) =>
          currComments.filter((comment) => comment.comment_id !== comment_id)
        );
        setDeletingCommentId(null);
      })
      .catch(() => {
        setDeleteError("There was a problem deleting your comment.");
        setDeletingCommentId(null);
      });
  };

  return (
    <div className="comments-container">
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.comment_id} className="comment-card">
          <p>
            Author: {comment.author} -{" "}
            {new Date(comment.created_at).toLocaleDateString()}
          </p>
          <p>{comment.body}</p>
          <p>Votes: {comment.votes}</p>

          {comment.author === "butter_bridge" && (
            <button
              onClick={() => handleDelete(comment.comment_id)}
              disabled={deletingCommentId === comment.comment_id}
            >
              {deletingCommentId === comment.comment_id
                ? "Deleting..."
                : "Delete"}
            </button>
          )}
        </div>
      ))}
      {deleteError && <p style={{ color: "red" }}>{deleteError}</p>}
    </div>
  );
}

export default CommentList;
