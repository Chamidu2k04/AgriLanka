import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProblemBanner from './components/ProblemBanner';
import LandingPage from './pages/LandingPage';
import BrowseListingsPage from './pages/BrowseListingsPage';
import PostListingPage from './pages/PostListingPage';
import AuthPage from './pages/AuthPage';
import { Sprout, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState('home');

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <div>
          {/* Main Top Navigation */}
          <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

          {/* Sri Lankan Crisis & Helpline Context Banner */}
          {currentTab !== 'home' && <ProblemBanner />}

          {/* Page Routing / Screen Switcher */}
          <main>
            {currentTab === 'home' && (
              <LandingPage
                onNavigateBrowse={() => setCurrentTab('browse')}
                onNavigateAuth={() => setCurrentTab('auth')}
              />
            )}
            {currentTab === 'browse' && (
              <BrowseListingsPage 
                onNavigatePost={() => setCurrentTab('post')} 
              />
            )}
            {currentTab === 'post' && (
              <PostListingPage 
                onListingCreated={() => setCurrentTab('browse')} 
                onBackToBrowse={() => setCurrentTab('browse')} 
              />
            )}
            {currentTab === 'auth' && (
              <AuthPage onAuthSuccess={() => setCurrentTab('browse')} />
            )}
          </main>
        </div>

        {/* Real Production Application Footer */}
        <footer className="mt-20 bg-emerald-950 text-gray-300 border-t border-emerald-900">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
              {/* Brand & Mission */}
              <div className="space-y-3 md:col-span-1">
                <div 
                  onClick={() => setCurrentTab('home')}
                  className="flex items-center space-x-2 cursor-pointer group"
                >
                  <div className="bg-emerald-600 text-white p-2 rounded-xl">
                    <Sprout className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-bold text-white tracking-tight">
                    Agri<span className="text-emerald-400">Lanka</span>
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">
                  A direct digital agricultural marketplace connecting farmers with commercial buyers across Sri Lanka. Fair trade, reduced food waste, and transparent wholesale pricing.
                </p>
                <div className="pt-1 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Direct Trade • Zero Middlemen</span>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                  Quick Navigation
                </h4>
                <ul className="space-y-2.5 text-xs">
                  <li>
                    <button 
                      onClick={() => { setCurrentTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="hover:text-emerald-400 transition cursor-pointer"
                    >
                      Home
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setCurrentTab('browse'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="hover:text-emerald-400 transition cursor-pointer"
                    >
                      Browse Produce
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setCurrentTab('post'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="hover:text-emerald-400 transition cursor-pointer"
                    >
                      Post a Listing
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => { setCurrentTab('auth'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                      className="hover:text-emerald-400 transition cursor-pointer"
                    >
                      Sign In / Register
                    </button>
                  </li>
                </ul>
              </div>

              {/* Produce Categories */}
              <div>
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                  Produce Categories
                </h4>
                <ul className="space-y-2.5 text-xs text-gray-400">
                  <li className="hover:text-emerald-400 transition cursor-pointer" onClick={() => { setCurrentTab('browse'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Fresh Vegetables (Tomatoes, Leeks, Onions)
                  </li>
                  <li className="hover:text-emerald-400 transition cursor-pointer" onClick={() => { setCurrentTab('browse'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Tropical Fruits (Mangoes, Bananas, Papaya)
                  </li>
                  <li className="hover:text-emerald-400 transition cursor-pointer" onClick={() => { setCurrentTab('browse'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Grains & Paddy (Samba, Keeri Samba, Nadu)
                  </li>
                  <li className="hover:text-emerald-400 transition cursor-pointer" onClick={() => { setCurrentTab('browse'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    Ceylon Spices (Pepper, Cinnamon, Cloves)
                  </li>
                </ul>
              </div>

              {/* Official Advisory & Support */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
                  National Support
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed">
                  For agricultural advisory, pest control, and harvest guidelines from the Department of Agriculture:
                </p>
                <a
                  href="tel:1920"
                  className="inline-flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-emerald-900/80 hover:bg-emerald-900 border border-emerald-700/60 text-emerald-200 text-xs font-semibold transition"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-300" />
                  <span>National Helpline: <strong>1920</strong></span>
                </a>
                <div className="text-[11px] text-gray-500 flex items-center gap-1.5 pt-1">
                  <MapPin className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Serving all 25 Districts of Sri Lanka</span>
                </div>
              </div>
            </div>

            {/* Bottom Copyright Bar */}
            <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
              <p>© {new Date().getFullYear()} AgriLanka. Direct Agricultural Marketplace. All rights reserved.</p>
              <p className="flex items-center gap-1 text-gray-400">
                Empowering Sri Lankan agriculture with transparent trade
              </p>
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
