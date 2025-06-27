
import '../../styles/style.scss'
import { Briefcase } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function Footer() {
  // const navigate = useNavigate();
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <h3> <Briefcase size={24} className="me-2 text-purple-700"/>  Budget Book</h3>
          <p>Helping you track, save, and manage your finances effortlessly.</p>
        </div>
        <div className="footer-links">
          <Link to="/" >Home</Link>
          <Link to="/login" >Login</Link>
          <Link to="/register" >Register</Link>
          {/* <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register">Register</a> */}
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} Budget Book. All rights reserved.
      </div>
    </footer>
  );
}




// import React from 'react'

// export default function Footer() {
//   return (
//     <div className='footer bg-dark text-light p-4'>
//         <h6 className='text-center'>All rights reserved</h6>
//     </div>
//   )
// }



