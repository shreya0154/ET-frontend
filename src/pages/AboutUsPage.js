
// import { useEffect } from 'react';
// import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

import Footer from '../components/layouts/Footer';
import '../styles/style.scss';
import Navbar from '../components/layouts/Navbar';

export default function AboutUs() {
    const navigate = useNavigate();
  return (
    <>
    {/* <nav className="navbar">
        <div className="logo">💼 Budget Book</div>
        <div className="nav-buttons">
          <Button type="link" onClick={() => navigate('/aboutpage')}>About Us</Button>
          <Button type="link" onClick={() => navigate('/login')}>Login</Button>
          <Button type="link" onClick={() => navigate('/register')}>Register</Button>
        </div>
      </nav> */}
      <Navbar/>
    <div className="about-container">
      <div className="gradient-overlay"></div>

      <div className="about-content">
        <h1 className="about-heading">What is Budget Book?</h1>
        <p className="about-description">
          Budget Book is your smart, secure, and simple way to track income and expenses. We empower users with insights to manage their money more effectively — helping you save better, spend wisely, and plan confidently.
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <h3>💰 Track Transactions</h3>
            <p>Record and categorize your income and expenses in real time.</p>
          </div>
          <div className="feature-card">
            <h3>📊 Visual Insights</h3>
            <p>Understand where your money goes with charts and breakdowns.</p>
          </div>
          <div className="feature-card">
            <h3>🔒 Secure & Private</h3>
            <p>Your data is encrypted and stays safe with us.</p>
          </div>
          <div className="feature-card">
            <h3>📅 Monthly Overview</h3>
            <p>Get monthly summaries and stay on top of your budget goals.</p>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}















// import { useEffect } from 'react';
// import { Button } from 'antd';
// import { useNavigate } from 'react-router-dom';
// import '../styles/style.scss';

// export default function LandingPage() {
//   const navigate = useNavigate();

//   useEffect(() => {
//     const interBubble = document.querySelector('.interactive');
//     let curX = 0, curY = 0, tgX = 0, tgY = 0;

//     function move() {
//       curX += (tgX - curX) / 20;
//       curY += (tgY - curY) / 20;
//       if (interBubble) {
//         interBubble.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
//       }
//       requestAnimationFrame(move);
//     }

//     const handleMouseMove = (event) => {
//       tgX = event.clientX;
//       tgY = event.clientY;
//     };

//     window.addEventListener('mousemove', handleMouseMove);
//     move();

//     return () => {
//       window.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   return (
//     <div className="landing-container">
//       {/* Navbar */}
//       <nav className="navbar">
//         <div className="logo">💼 Budget Book</div>
//         <div className="nav-buttons">
//           <Button type="link" onClick={() => navigate('/login')}>Login</Button>
//           <Button type="link" onClick={() => navigate('/register')}>Register</Button>
//         </div>
//       </nav>

//       {/* Gradient Background Bubbles */}
//       <div className="gradient-overlay">
//         <div className="g1"></div>
//         <div className="g2"></div>
//         <div className="g3"></div>
//         <div className="g4"></div>
//         <div className="g5"></div>
//         <div className="interactive"></div>
//       </div>

//       {/* Welcome Section */}
//       <div className="hero-section">
//         <h1 className="shiny-text">Take Control of Your Finances with Budget Book</h1>
//         <div className="button-group">
//           <Button className="interactive-page-button" onClick={() => navigate('/login')}>Login</Button>
//           <Button className="interactive-page-button" onClick={() => navigate('/register')}>Register</Button>
//         </div>
//       </div>

//       {/* About Us Section */}
//       <div className="about-section">
//         <h2 className="about-heading">What is Budget Book?</h2>
//         <p className="about-description">
//           Budget Book is your smart, secure, and simple way to track income and expenses. We empower users with insights to manage their money more effectively — helping you save better, spend wisely, and plan confidently.
//         </p>

//         <div className="features-grid">
//           <div className="feature-card">
//             <h3>💰 Track Transactions</h3>
//             <p>Record and categorize your income and expenses in real time.</p>
//           </div>
//           <div className="feature-card">
//             <h3>📊 Visual Insights</h3>
//             <p>Understand where your money goes with charts and breakdowns.</p>
//           </div>
//           <div className="feature-card">
//             <h3>🔒 Secure & Private</h3>
//             <p>Your data is encrypted and stays safe with us.</p>
//           </div>
//           <div className="feature-card">
//             <h3>📅 Monthly Overview</h3>
//             <p>Get monthly summaries and stay on top of your budget goals.</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
