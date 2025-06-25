import Header from "./components/Header";
import ArticleList from "./components/ArticleList";
import ArticleDetails from "./components/ArticleDetails";
import { Routes, Route } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<ArticleList />} />
        <Route path="/articles/:article_id" element={<ArticleDetails />} />
      </Routes>
    </>
  );
}

export default App;
