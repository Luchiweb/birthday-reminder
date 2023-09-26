import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <div className="nav-container">
      <Link to={'/my-birthday'} className="nav">
        My birthday
      </Link>
      <Link to={'/'} className="nav">
        Today
      </Link>
      <Link to={'/friends'} className="nav">
        List of friends
      </Link>
    </div>
  );
}

export default Header;
