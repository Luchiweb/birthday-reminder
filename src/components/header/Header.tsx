import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="flex gap-6 justify-center">
      <Link
        to={'/my-birthday'}
        className="no-underline bg-indigo-100 rounded-full px-4 py-2 transition-colors hover:bg-indigo-200"
      >
        My birthday
      </Link>
      <Link to={'/'} className="no-underline bg-indigo-100 rounded-full px-4 py-2 transition-colors hover:bg-indigo-200">
        Today
      </Link>
      <Link to={'/friends'} className="no-underline bg-indigo-100 rounded-full px-4 py-2 transition-colors hover:bg-indigo-200">
        List of friends
      </Link>
    </div>
  );
}

export default Header;
