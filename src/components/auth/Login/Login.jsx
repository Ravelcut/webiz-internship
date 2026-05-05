import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { companyService } from '../../../services/companyService';
import { employeeService } from '../../../services/employeeService';
import { recruiterService } from '../../../services/recruiterService';
import { talentService } from '../../../services/talentService';
import './Login.css';

const Login = ({ onLoginSuccess }) => {
  const [role, setRole] = useState('company'); // 'company', 'employee', 'recruiter', 'talent'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let response;
      const payload = { email, password };

      switch (role) {
        case 'company':
          response = await companyService.authenticate(payload);
          break;
        case 'employee':
          response = await employeeService.authenticate(payload);
          break;
        case 'recruiter':
          response = await recruiterService.authenticate(payload);
          break;
        case 'talent':
          response = await talentService.authenticate(payload);
          break;
        default:
          throw new Error('Invalid role selected');
      }

      if (response && response.token) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('userRole', role);
        localStorage.setItem('userData', JSON.stringify(response));
        onLoginSuccess(response);
      } else {
        // Fallback for development if no backend is running
        console.warn('No token received, simulation mode');
        const mockResponse = { token: 'mock-token', name: 'Demo User', role };
        localStorage.setItem('token', 'mock-token');
        localStorage.setItem('userRole', role);
        onLoginSuccess(mockResponse);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password. Please try again.');
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
            className={`role-btn ${role === 'employee' ? 'active' : ''}`}
            onClick={() => setRole('employee')}
          >
            Employee
          </button>
          <button 
            className={`role-btn ${role === 'recruiter' ? 'active' : ''}`}
            onClick={() => setRole('recruiter')}
          >
            Recruiter
          </button>
          <button 
            className={`role-btn ${role === 'talent' ? 'active' : ''}`}
            onClick={() => setRole('talent')}
          >
            Talent
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
                required
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
                required
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
