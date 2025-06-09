import React, { useState } from 'react';
import './loginForm.css';
import { useContext } from 'react';
import { AuthContext } from '../AuthContext'; // adjust path if needed
import { useNavigate } from 'react-router-dom';


const LoginForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useContext(AuthContext); // login function from context
  const navigate = useNavigate();            // for redirecting to /stream

  

const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    email, // using email for both login and signup
    password,
  };

if (!isLogin) {
  if (password !== confirmPassword) {
    alert('Passwords do not match!');
    return;
  }

  const response = await fetch('http://127.0.0.1:8000/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (response.ok) {
    alert('Signup successful!');
  } else {
    alert(data.detail || 'Signup failed!');
  }
} else {
  const response = await fetch('http://127.0.0.1:8000/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json();
  if (response.ok) {
    login();             // ✅ Update auth state
    alert('Login successful!');
    navigate('/stream'); // ✅ Redirect
  } else {
    alert(data.detail || 'Login failed!');
  }
}

};


  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        {/* Dynamic title here */}
        <h2 className="login-title">{isLogin ? 'Login Form' : 'Signup Form'}</h2>

        <div className="tab-selector">
          <button
            className={isLogin ? 'tab active' : 'tab'}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={!isLogin ? 'tab active' : 'tab'}
            onClick={() => setIsLogin(false)}
          >
            Signup
          </button>
        </div>

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="login-input"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="login-input"
            required
          />

          {!isLogin ? (
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="login-input"
              required
            />
          ) : (
            <div className="forgot-password">Forgot password?</div>
          )}

          <button type="submit" className="login-submit">
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>

        <div className="login-footer">
          {isLogin ? (
            <>
              Need an account?{' '}
              <span className="footer-link" onClick={() => setIsLogin(false)}>
                Signup now
              </span>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <span className="footer-link" onClick={() => setIsLogin(true)}>
                Login
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
