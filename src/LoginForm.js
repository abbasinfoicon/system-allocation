import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { login } from './authService';
import { get, put, post } from './Fetch1';
import { toast } from 'react-toastify';

function LoginForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/login', formData);
      const { token } = response.data.data;
      if (response.status === 200) {
        // Store the token in local storage
        login(token);

        // Redirect the user to a protected route or update the UI
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response.data.message);
      // setError(error.response.data.error); // Display error message to the user
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup'); // Navigate to the sign-up page
  };

  return (
    <div className='form_signin'>
      <div className="container">
        <div className="screen">
          <div className="screen__content">
            <form className="login" onSubmit={handleSubmit}>
              <h3 className='heading'>Sign in</h3>
              <div className="login__field">
                <i className="login__icon fas fa-user"></i>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="login__input"
                  placeholder="User name / Email"
                />

              </div>
              <div className="login__field">
                <i className="login__icon fas fa-lock"></i>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="login__input"
                  placeholder="Password"
                />
              </div>
              <button type="submit" className="button login__submit">
                <span className="button__text">Log In Now</span>
                <i className="button__icon fas fa-chevron-right"></i>
              </button>
            </form>
            {error && <div className="error-message">{error}</div>}
            <div className="social-login">
              <div className="social-icons">
                <button type="button" onClick={handleSignUpClick} className="button">
                  Sign Up
                </button>
              </div>
            </div>
          </div>
          <div className="screen__background">
            <span className="screen__background__shape screen__background__shape4"></span>
            <span className="screen__background__shape screen__background__shape3"></span>
            <span className="screen__background__shape screen__background__shape2"></span>
            <span className="screen__background__shape screen__background__shape1"></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
