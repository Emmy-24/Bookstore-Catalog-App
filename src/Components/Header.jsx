import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <Link to="/">Home</Link>
      <Link to="/About">About</Link>
      <Link to="/Shop">Shop</Link>
      <Link to="/Login">Login</Link>
    </header>
  );
};