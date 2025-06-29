import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import ArticleDetails from "./components/ArticleDetails";
import TopicList from "./components/TopicList";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<ArticleDetails />} />
        <Route path="/topics" element={<TopicList />} />
        <Route path="/topics/:topic" element={<ArticleList />} />
        <Route
          path="*"
          element={<h2 className="error-message">Oops! Page not found.</h2>}
        />
      </Routes>
    </>
  );
}

export default App;
