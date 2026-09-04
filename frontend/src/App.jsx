import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProblemBanner from './components/ProblemBanner';
import BrowseListingsPage from './pages/BrowseListingsPage';
import PostListingPage from './pages/PostListingPage';
import AuthPage from './pages/AuthPage';
import { Code2, Users, CheckCircle2 } from 'lucide-react';

export function App() {
  const [currentTab, setCurrentTab] = useState('browse');

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <div>
          {/* Main Top Navigation */}
          <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

          {/* Sri Lankan Crisis & Helpline Context Banner (Rubric #2 & #10) */}
          <ProblemBanner />

          {/* Page Routing / Screen Switcher */}
          <main>
            {currentTab === 'browse' && <BrowseListingsPage />}
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

        {/* Student Hackathon Team Workstation Guide (Bottom Sticky / Footer) */}
        <footer className="mt-12 bg-white border-t border-gray-200 text-xs text-gray-600 py-6 px-4">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center space-x-2 text-emerald-800">
              <Users className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold">Agri Lanka Dev Team:</span>
              <span className="text-gray-500">4-Member Parallel Slices Active</span>
            </div>

            <div className="flex flex-wrap gap-2 text-[11px]">
              <span className="px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                Member A: Auth & JWT
              </span>
              <span className="px-2 py-0.5 bg-purple-50 text-purple-700 border border-purple-200 rounded">
                Member B: Browse & Filters
              </span>
              <span className="px-2 py-0.5 bg-amber-50 text-amber-700 border border-amber-200 rounded">
                Member C: Card, Calc & Actions
              </span>
              <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded">
                Member D: Post Form & Deploy
              </span>
            </div>

            <div className="text-gray-400">
              SLIIT SE3090 — Year 3 Sem 1
            </div>
          </div>
        </footer>
      </div>
    </AuthProvider>
  );
}

export default App;
