import React from 'react';
import { Sprout, PlusCircle, LogIn, LogOut, User as UserIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * ===============================================================
 * NAVBAR COMPONENT (Assigned to: Member D - Post Form, Infra & Ship)
 * ===============================================================
 * Member D Tasks:
 * 1. Display active navigation tabs ('browse', 'post', 'auth')
 * 2. Show dynamic auth state (Login button vs User Name + Logout)
 * 3. Mobile responsiveness
 * ===============================================================
 */

export const Navbar = ({ currentTab, setCurrentTab }) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <div 
            onClick={() => setCurrentTab('browse')}
            className="flex items-center space-x-2 cursor-pointer"
          >
            <div className="bg-emerald-600 text-white p-2 rounded-lg">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">Agri Lanka</span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                Fair-Price Trade
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <button
              onClick={() => setCurrentTab('browse')}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentTab === 'browse'
                  ? 'bg-emerald-50 text-emerald-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              Browse Harvests
            </button>

            <button
              onClick={() => setCurrentTab('post')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                currentTab === 'post'
                  ? 'bg-emerald-600 text-white'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Harvest</span>
            </button>

            {/* Auth Actions (Dynamic based on login status) */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 ml-2 pl-2 border-l border-gray-200">
                <span className="hidden md:flex items-center text-sm font-medium text-gray-700">
                  <UserIcon className="w-4 h-4 mr-1 text-emerald-600" />
                  {user?.fullName || 'User'} ({user?.role || 'Farmer'})
                </span>
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-3 py-1.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentTab('auth')}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentTab === 'auth'
                    ? 'bg-gray-200 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <LogIn className="w-4 h-4" />
                <span>Login / Register</span>
              </button>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
