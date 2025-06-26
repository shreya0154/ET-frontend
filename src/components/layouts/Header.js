
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message } from 'antd';
import { Briefcase } from 'lucide-react';
import '../../styles/style.scss';

function Header() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem('user');
    message.success('Logout successfully');
    navigate('/login');
  };

  return (
    <header className="landing-navbar shadow-sm fixed-top">
      <div className="container d-flex justify-content-between align-items-center py-2">
        <Link to="/" className="navbar-logo d-flex align-items-center text-decoration-none">
          <Briefcase size={24} className="me-2 text-purple-700"/>
          <span className="fw-bold fs-4 text-dark">Budget Book</span>
        </Link>

        <div className="d-flex align-items-center">
          {currentUser && (
            <>
              <span className="me-3 fw-semibold text-secondary">
                Hello, {currentUser.username}
              </span>
              <button className="btn btn-outline-dark" onClick={logoutHandler}>
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
