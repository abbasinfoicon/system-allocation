import React from 'react';
import { useNavigate } from 'react-router-dom';

function SignUpSuccess() {
  const navigate = useNavigate();

  const handleBackToLoginClick = () => {
    navigate('/'); // Navigate back to the login page
  };

  return (
    <div className='success_pg'>
      <div className="container text-center">
        <div className="card">
          <div className='check_mark'>
            <i className="checkmark">✓</i>
          </div>

          <h1>Sign Up Successful</h1>
          <p>You have signed up successfully!</p>

          <button type="button" onClick={handleBackToLoginClick} className="button">
            Back to Login Page
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpSuccess;
