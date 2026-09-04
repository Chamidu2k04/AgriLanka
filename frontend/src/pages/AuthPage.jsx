import React, { useState } from 'react';
import { User, Phone, Lock, MapPin, Briefcase, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * User Authentication Page
 * Handles login and registration for Farmers and Buyers.
 */


const DISTRICTS = [
  'Dambulla', 'Nuwara Eliya', 'Jaffna', 'Badulla', 'Welimada', 
  'Matale', 'Polonnaruwa', 'Kandy', 'Kurunegala', 'Colombo', 
  'Gampaha', 'Anuradhapura', 'Hambantota', 'Ratnapura'
];

export const AuthPage = ({ onAuthSuccess }) => {
  const { login, register } = useAuth();

  const [mode, setMode] = useState('login'); // 'login' or 'register'
  
  // Login Form State
  const [loginForm, setLoginForm] = useState({
    phone: '',
    password: '',
  });

  // Register Form State
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    phone: '',
    password: '',
    role: 'Farmer',
    district: 'Dambulla',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // Sri Lankan Phone Regex (10 digits starting with 0, e.g., 0771234567)
  const phoneRegex = /^[0-9]{10}$/;

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: null });
  };

  // Handle Login form submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // 1. Phone number validation
    if (!loginForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(loginForm.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit Sri Lankan phone number (e.g. 0771234567)';
    }

    // 2. Password validation
    if (!loginForm.password) {
      newErrors.password = 'Password is required';
    }

    // Stop submission if validation errors exist
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setStatusMessage('');

    try {
      await login(loginForm.phone.trim(), loginForm.password);
      if (onAuthSuccess) onAuthSuccess();
    } catch (err) {
      setErrors({ form: err.message || 'Login failed. Please check your credentials.' });
    } finally {
      setLoading(false);
    }
  };

  // Handle Register form submission
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};

    // 1. Full name validation
    if (!registerForm.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    
    // 2. Phone number validation
    if (!registerForm.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(registerForm.phone.trim())) {
      newErrors.phone = 'Enter a valid 10-digit Sri Lankan phone number (e.g. 0771234567)';
    }

    // 3. Password validation (min 6 characters)
    if (!registerForm.password || registerForm.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // 4. District validation
    if (!registerForm.district) {
      newErrors.district = 'District is required';
    }

    // Stop submission if validation errors exist
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setStatusMessage('');

    try {
      await register({
        ...registerForm,
        fullName: registerForm.fullName.trim(),
        phone: registerForm.phone.trim(),
      });
      if (onAuthSuccess) onAuthSuccess();
    } catch (err) {
      setErrors({ form: err.message || 'Registration failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-10">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Tab Switcher */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => { setMode('login'); setErrors({}); }}
            className={`flex-1 py-3.5 text-center text-sm font-semibold transition ${
              mode === 'login'
                ? 'border-b-2 border-emerald-600 text-emerald-700 bg-emerald-50/40'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => { setMode('register'); setErrors({}); }}
            className={`flex-1 py-3.5 text-center text-sm font-semibold transition ${
              mode === 'register'
                ? 'border-b-2 border-emerald-600 text-emerald-700 bg-emerald-50/40'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Create Account
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {/* Status / Error alert */}
          {errors.form && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{errors.form}</span>
            </div>
          )}

          {statusMessage && (
            <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-xs sm:text-sm flex items-center gap-2">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  10-Digit Mobile Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="0771234567"
                    value={loginForm.phone}
                    onChange={handleLoginChange}
                    maxLength={10}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-600 font-medium">{errors.password}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50 text-sm cursor-pointer shadow-sm shadow-emerald-200"
              >
                {loading ? 'Signing in...' : 'Sign In to AgriLanka'}
              </button>
            </form>


          ) : (
            /* REGISTER FORM */
            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="fullName"
                    placeholder="e.g. Bandara Senanayake"
                    value={registerForm.fullName}
                    onChange={handleRegisterChange}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                {errors.fullName && <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  10-Digit Mobile Phone
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    name="phone"
                    placeholder="0771234567"
                    value={registerForm.phone}
                    onChange={handleRegisterChange}
                    maxLength={10}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                  Password (min 6 characters)
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    value={registerForm.password}
                    onChange={handleRegisterChange}
                    className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-600 font-medium">{errors.password}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    Role
                  </label>
                  <select
                    name="role"
                    value={registerForm.role}
                    onChange={handleRegisterChange}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Farmer">Farmer (Producer)</option>
                    <option value="Buyer">Buyer (Wholesaler)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase mb-1">
                    District
                  </label>
                  <select
                    name="district"
                    value={registerForm.district}
                    onChange={handleRegisterChange}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    {DISTRICTS.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                  {errors.district && <p className="mt-1 text-xs text-red-600 font-medium">{errors.district}</p>}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50 text-sm"
              >
                {loading ? 'Creating account...' : 'Complete Registration'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
