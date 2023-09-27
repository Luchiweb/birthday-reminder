import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="flex gap-6 justify-center mb-6">
      <Link to={'/my-birthday'} className="no-underline bg-pink-100 rounded-full px-4 py-2 transition-colors hover:bg-pink-200">
        My birthday
      </Link>
      <Link to={'/'} className="no-underline bg-pink-100 rounded-full px-4 py-2 transition-colors hover:bg-pink-200">
        Today
      </Link>
      <Link to={'/friends'} className="no-underline bg-pink-100 rounded-full px-4 py-2 transition-colors hover:bg-pink-200">
        List of friends
      </Link>
    </div>
  );
}

export default Header;
