import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Footer = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [token, setTokens] = useState('');


  useEffect(() => {
    const token_name = JSON.parse(localStorage.getItem('token'));
    if (token_name) {
      setTokens(token_name);
    } else {
      setTokens('');
    }
  }, [navigate]);

  return (
    <div className='footer'>
      <div className="container">
        <footer className="d-flex flex-wrap justify-content-between align-items-center border-top">
          <p className="col-md-4 mb-0 text-muted">© 2023 Company, Inc</p>

          <ul className="nav col-md-4 justify-content-end">
            <li className="nav-item"><Link to={token ? '/dashboard' : '/login'} className="nav-link px-2 text-muted">Home</Link></li>
            <li className="nav-item"><Link to={token ? '/addsystem' : '/login'} className="nav-link px-2 text-muted">Asset Data</Link></li>
            <li className="nav-item"><Link to={token ? '/asset' : '/login'} className="nav-link px-2 text-muted">Add System</Link></li>
            <li className="nav-item"><Link to={token ? '/adduser' : '/login'} className="nav-link px-2 text-muted">Add User</Link></li>
          </ul>
        </footer>
      </div>
    </div>
  )
}

export default Footer