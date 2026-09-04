import React from 'react';
import { Sprout, PlusCircle, LogIn, LogOut, User as UserIcon, LayoutGrid, MapPin } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

/**
 * ===============================================================
 * NAVBAR COMPONENT (Assigned to: Member D - Post Form, Infra & Ship)
 * ===============================================================
 * Satisfies Rubric Requirement #8 ("Basic navigation between screens")
 * - Dynamic tab navigation between Browse, Post, and Auth
 * - Dynamic user authentication status display and logout
 * - Responsive layout for both desktop and mobile
 * ===============================================================
 */

export const Navbar = ({ currentTab, setCurrentTab }) => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Brand Logo */}
          <div
            onClick={() => setCurrentTab('browse')}
            className="flex items-center space-x-2.5 cursor-pointer group"
          >
            <div className="bg-emerald-600 group-hover:bg-emerald-700 text-white p-2 rounded-xl transition-all shadow-sm shadow-emerald-200">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight">
                Agri<span className="text-emerald-600">Lanka</span>
              </span>
              <span className="hidden sm:inline-block text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                Fair-Price Trade
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center space-x-1 sm:space-x-3">
            {/* Browse Harvests Tab */}
            <button
              onClick={() => setCurrentTab('browse')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentTab === 'browse'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold shadow-xs'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
              <span>Browse Harvests</span>
            </button>

            {/* Post Harvest Tab */}
            <button
              onClick={() => setCurrentTab('post')}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                currentTab === 'post'
                  ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-200 font-semibold'
                  : 'text-emerald-700 hover:bg-emerald-50'
              }`}
            >
              <PlusCircle className="w-4 h-4" />
              <span>Post Harvest</span>
            </button>

            {/* Dynamic Authentication Controls */}
            {isAuthenticated ? (
              <div className="flex items-center space-x-2 ml-1 sm:ml-2 pl-2 sm:pl-3 border-l border-gray-200">
                <div className="hidden sm:flex items-center space-x-1.5 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded-lg text-xs text-gray-700">
                  <UserIcon className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-medium truncate max-w-[120px]">
                    {user?.fullName || 'Farmer'}
                  </span>
                  <span
                    className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-sm ${
                      user?.role === 'Farmer'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {user?.role || 'Farmer'}
                  </span>
                  {user?.district && (
                    <span className="text-gray-400 flex items-center gap-0.5 text-[10px]">
                      <MapPin className="w-2.5 h-2.5" />
                      {user.district}
                    </span>
                  )}
                </div>

                <button
                  onClick={logout}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium text-red-600 hover:bg-red-50 transition"
                  title="Logout from session"
                >
                  <LogOut className="w-4 h-4" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => setCurrentTab('auth')}
                className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                  currentTab === 'auth'
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
