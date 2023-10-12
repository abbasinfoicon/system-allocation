import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { logout } from '../authService';

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [token, setTokens] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/login');
    };


    useEffect(() => {
        const token_name = JSON.parse(localStorage.getItem('token'));
        if (token_name) {
            setTokens(token_name);
        } else {
            setTokens('');
        }
    }, [navigate]);

    return (
        <div className='header'>
            <div className="container">
                <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                    <Link to={token ? '/dashboard' : '/login'} className="d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none">
                        <img src="https://www.infoicontechnologies.com/img/logo-white.png" className='img-fluid' />
                    </Link>

                    <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                        <li><Link to={token ? '/dashboard' : '/login'} className={`nav-link px-2 ${location.pathname == '/dashboard' ? 'link-dark' : 'link-light'}`}>Home</Link></li>
                        <li><Link to={token ? '/addsystem' : '/login'} className={`nav-link px-2 ${location.pathname == '/addsystem' ? 'link-dark' : 'link-light'}`}>Add System</Link></li>
                        <li><Link to={token ? '/asset' : '/login'} className={`nav-link px-2 ${location.pathname == '/asset' ? 'link-dark' : 'link-light'}`}>Asset Data</Link></li>
                        <li><Link to={token ? '/addemp' : '/login'} className={`nav-link px-2 ${location.pathname == '/addemp' ? 'link-dark' : 'link-light'}`}>Add Emp</Link></li>
                    </ul>

                    <div className="col-md-3 text-end">
                        {
                            token ? <><Link to={token ? '/adduser' : '/login'} type="button" className="btn btn-light me-2">New User</Link><button onClick={handleLogout} className='btn btn-primary'>Logout</button></> : <Link to="/login" type="button" className="btn btn-primary">Login</Link>
                        }

                    </div>
                </header>
            </div>
        </div>
    )
}

export default Header