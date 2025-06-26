import '../../styles/style.scss'
import { Button } from 'antd';
import { Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();
    return (
        <>
        <nav className="navbar">
        <div className="logo"> <Briefcase size={24} className="me-2 text-purple-700"/> Budget Book</div>
        <div className="nav-buttons">
          <Button type="link" onClick={() => navigate('/aboutpage')}>About Us</Button>
          <Button type="link" onClick={() => navigate('/login')}>Login</Button>
          <Button type="link" onClick={() => navigate('/register')}>Register</Button>
        </div>
      </nav>
      </>
    )
}