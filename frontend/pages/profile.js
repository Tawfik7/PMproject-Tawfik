'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProfilePage = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login');
          return;
        }
        
        const response = await axios.get('http://localhost:5000/api/users/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setUser(response.data.user);

        if (response.data.user.role === 'admin') {
          setIsAdmin(true);
        }
      } catch (error) {
        console.error('Failed to fetch user profile:', error);
        router.push('/login');
      }
    };

    fetchUserProfile();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/');
    setTimeout(() => {
      window.location.reload();
    }, 10);
  };

  const handleAdminOptions = () => {
    router.push('/AdminPage');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <header className="bg-blue-700 py-6 px-4 md:px-6">
        <div className="container flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="relative flex shrink-0 overflow-hidden rounded-full h-12 w-12">
              <span className="flex h-full w-full items-center justify-center rounded-full bg-blue-200">
                {user.firstName[0]}{user.lastName[0]}
              </span>
            </span>
            <div className="grid gap-0.5">
              <h1 className="text-xl font-bold text-white">{user.firstName} {user.lastName}</h1>
              <p className="text-sm text-blue-100">{user.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            {isAdmin && (
              <button
                onClick={handleAdminOptions}
                className="inline-flex h-9 items-center justify-center rounded-md bg-blue-600 px-4 text-sm font-medium text-white shadow transition-colors hover:bg-blue-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-700"
              >
                Admin Options
              </button>
            )}
            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-700 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-blue-600 bg-white hover:bg-blue-100 hover:text-blue-700 py-2 h-9 px-4 text-sm"
            >
              Logout
            </button>
          </div>
        </div>
      </header>
      <main className="py-12 px-4 md:px-6 bg-white">
        <div className="container grid gap-8">
          <div className="rounded-lg border bg-white text-black shadow-sm" data-v0-t="card">
            <div className="flex flex-col space-y-1.5 p-6">
              <h3 className="whitespace-nowrap text-2xl font-semibold leading-none tracking-tight">About</h3>
            </div>
            <div className="p-6 grid gap-4">
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <div className="font-medium">Name:</div>
                <div>{user.firstName} {user.lastName}</div>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <div className="font-medium">Email:</div>
                <div>{user.email}</div>
              </div>
              <div className="grid grid-cols-[100px_1fr] items-center gap-4">
                <div className="font-medium">Role:</div>
                <div>{user.role}</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;
