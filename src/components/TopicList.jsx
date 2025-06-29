import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function TopicList() {
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://nc-news-pdkt.onrender.com/api/topics")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Fetch topics failed");
        }
        return res.json();
      })
      .then(({ topics }) => {
        setTopics(topics);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading topics...</p>;
  if (error) return <p>Something went wrong.</p>;

  return (
    <div className="topics-container">
      <h3>Topics</h3>
      <ul className="topics-list">
        {topics.map((topic) => (
          <li key={topic.slug}>
            <Link to={`/topics/${topic.slug}`}>{topic.slug}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TopicList;
