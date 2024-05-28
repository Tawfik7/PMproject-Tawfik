// components/Navbar.js

import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push('/profile');
    } else {
      router.push('/login');
    }
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link href="/" legacyBehavior>
            <a className={`text-lg font-semibold ${router.pathname === '/' ? 'text-white' : 'text-blue-200'} hover:text-white`}>
              Home
            </a>
          </Link>
          <Link href="/training-centers" legacyBehavior>
            <a className={`ml-4 text-lg font-semibold ${router.pathname === '/training-centers' ? 'text-white' : 'text-blue-200'} hover:text-white`}>
              Training Centers
            </a>
          </Link>
        </div>
        <div>
          <button onClick={handleProfileClick} className="text-lg font-semibold text-blue-200 hover:text-white">
            {isLoggedIn ? 'Profile' : 'Login'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
