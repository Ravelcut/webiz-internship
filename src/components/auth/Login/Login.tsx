// @ts-nocheck
import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { authService } from '../../../services/authService';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [role, setRole] = useState('company'); // 'company', 'talent', or 'recruiter'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    // 1. Strict Validation for Blank Fields
    if (!cleanEmail || !cleanPassword) {
      setError('Please enter both your email address and password.');
      setIsLoading(false);
      return;
    }

    try {
      let response;
      
      // 2. Authenticate against the backend API
      if (role === 'company') {
        response = await authService.login(cleanEmail, cleanPassword);
      } else if (role === 'talent') {
        response = await authService.loginTalent(cleanEmail, cleanPassword);
      } else if (role === 'recruiter') {
        response = await authService.loginRecruiter(cleanEmail, cleanPassword);
      }

      // 3. Save session and trigger login success
      if (response && (response.companyId || response.talentId || response.recruiterId || response.token)) {
        localStorage.setItem('userRole', role);
        localStorage.setItem('userData', JSON.stringify(response));
        localStorage.setItem('isLoggedIn', 'true');
        onLoginSuccess(response);
      } else {
        throw new Error('Authentication succeeded but returned no session token.');
      }
    } catch (err) {
      console.error('Backend authentication failed:', err);
      
      // Check for specific backend errors or network unreachable errors
      if (err.code === 'ERR_NETWORK') {
        setError('Connection failed: Unable to reach the backend server. Please verify your backend API is running.');
      } else if (err.response?.status === 400 || err.response?.status === 401) {
        setError('Invalid credentials. Please verify your email and password.');
      } else {
        setError(err.response?.data?.message || err.message || 'An unexpected error occurred during login. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>
      
      <div className="login-card glass shadow-premium animate-fade-in">
        <div className="login-header">
          <div className="logo-box">
            <Icon icon="solar:widget-2-bold" className="logo-icon" />
          </div>
          <h1 className="login-title">Welcome Back</h1>
          <p className="login-subtitle">Please enter your details to sign in</p>
        </div>

        <div className="role-selector">
          <button 
            className={`role-btn ${role === 'company' ? 'active' : ''}`}
            onClick={() => setRole('company')}
          >
            Company
          </button>
          <button 
            className={`role-btn ${role === 'talent' ? 'active' : ''}`}
            onClick={() => setRole('talent')}
          >
            Talent
          </button>
          <button 
            className={`role-btn ${role === 'recruiter' ? 'active' : ''}`}
            onClick={() => setRole('recruiter')}
          >
            Recruiter
          </button>
        </div>

        <form className="login-form" onSubmit={handleLogin}>
          {error && <div className="login-error-message animate-shake">{error}</div>}
          
          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Icon icon="solar:letter-linear" className="input-icon" />
              <input 
                id="email"
                type="email" 
                placeholder="name@company.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Icon icon="solar:lock-password-linear" className="input-icon" />
              <input 
                id="password"
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="login-options">
            <label className="checkbox-container">
              <input type="checkbox" />
              <span className="checkmark"></span>
              Remember me
            </label>
            <a href="#forgot" className="forgot-password">Forgot password?</a>
          </div>

          <button type="submit" className="login-submit-btn" disabled={isLoading}>
            {isLoading ? (
              <div className="spinner-sm"></div>
            ) : (
              <>
                <span>Sign In</span>
                <Icon icon="solar:alt-arrow-right-linear" />
              </>
            )}
          </button>
        </form>

        <div className="login-footer">
          <p>Don't have an account? <a href="#signup">Create an account</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
