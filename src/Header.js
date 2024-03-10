import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';

export default function Header() {
  const { setUserInfo: setUserContextInfo } = useContext(UserContext);
  const [userInfo, setLocalUserInfo] = useState(null);

  useEffect(() => {
    fetch('https://api-ct45.onrender.com/profile', {
      credentials: 'include',
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to fetch user profile');
        }
      })
      .then(data => {
        setUserContextInfo(data);
        setLocalUserInfo(data);
      })
      .catch(error => {
        console.error('Error fetching user profile:', error);
      });
  }, [setUserContextInfo]);

  function logout() {
    fetch('https://api-ct45.onrender.com/logout', {
      credentials: 'include',
      method: 'POST',
    })
      .then(response => {
        if (response.ok) {
          setLocalUserInfo(null);
        } else {
          throw new Error('Failed to logout');
        }
      })
      .catch(error => {
        console.error('Error logging out:', error);
      });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        FiMag
      </Link>
      <nav>
        {username ? (
          <>
            <Link to="/create">Create new post</Link>
            <a onClick={logout}>Logout</a>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
