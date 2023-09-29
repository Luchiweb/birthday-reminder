import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="flex gap-2 md:gap-4 lg:gap-6 justify-center mb-6">
      <Link
        to={'/my-birthday'}
        className="text-sm md:text-base text-center no-underline bg-pink-100 rounded-full px-4 py-2 transition-colors hover:bg-pink-200"
      >
        My birthday
      </Link>
      <Link
        to={'/'}
        className="text-sm md:text-base text-center no-underline bg-pink-100 rounded-full px-4 py-2 transition-colors hover:bg-pink-200"
      >
        Today
      </Link>
      <Link
        to={'/friends'}
        className="text-sm md:text-base text-center no-underline bg-pink-100 rounded-full px-4 py-2 transition-colors hover:bg-pink-200"
      >
        List of friends
      </Link>
    </div>
  );
}

export default Header;
