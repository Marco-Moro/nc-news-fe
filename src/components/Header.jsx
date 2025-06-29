import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <h1>Welcome to NC News!</h1>
      <nav>
        <Link to="/">Home</Link> | <Link to="/topics">Topics</Link>
      </nav>
    </header>
  );
};

export default Header;
