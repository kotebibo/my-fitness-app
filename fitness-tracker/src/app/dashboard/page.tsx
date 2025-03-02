"use client";

import { useEffect, useState } from 'react';

export default function DashboardPage() {
  const [user, setUser] = useState<{ email: string } | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    window.location.href = '/login'; // Redirect to login
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        window.location.href = '/login'; // Redirect to login if no token
        return;
      }

      const response = await fetch('/api/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data); // Set the user data
      } else {
        alert(data.message); // Show error message
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {user ? (
        <>
          <p>Welcome, {user.email}!</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}