import React from 'react';
import { 
  Sprout, 
  TrendingUp, 
  ShieldCheck, 
  Users, 
  Phone, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Truck, 
  MapPin, 
  DollarSign,
  HeartHandshake,
  Sparkles,
  Zap
} from 'lucide-react';

export const LandingPage = ({ onNavigateBrowse, onNavigatePost, onNavigateAuth }) => {
  return (
    <div className="space-y-16 pb-20 overflow-hidden">
      {/* Hero Section with Vibrant Agricultural Theme */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white py-20 sm:py-28 px-4 sm:px-6 lg:px-8 rounded-b-[2.5rem] shadow-xl border-b border-emerald-800/50">
        {/* Background glow effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden pointer-events-none opacity-20">
          <div className="absolute -top-32 -left-32 w-[32rem] h-[32rem] rounded-full bg-emerald-400 blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-32 -right-32 w-[32rem] h-[32rem] rounded-full bg-amber-400 blur-3xl opacity-60"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full bg-emerald-500 blur-2xl"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-7">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold bg-emerald-800/80 border border-emerald-500/40 text-emerald-200 shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin" style={{ animationDuration: '8s' }} />
            <span>Sri Lanka's Direct Fair-Price Agricultural Exchange</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
            Empowering Farmers. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-amber-300 drop-shadow-sm">
              Eliminating Crop Waste.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 max-w-3xl mx-auto leading-relaxed font-normal">
            Connecting smallholder farmers in <strong>Dambulla, Nuwara Eliya, Welimada, and Jaffna</strong> directly with wholesale commercial buyers and supermarket networks—eliminating middleman exploitation and sudden price crashes.
          </p>

          {/* Action Buttons */}
          <div className="pt-3 flex flex-col sm:flex-row justify-center items-center gap-4">
            <button
              onClick={onNavigateBrowse}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-emerald-950 shadow-lg shadow-amber-400/20 hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition duration-200 cursor-pointer"
            >
              <span>Explore Live Marketplace</span>
              <ArrowRight className="w-4 h-4 text-emerald-950" />
            </button>

            <button
              onClick={onNavigatePost}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-emerald-800/90 hover:bg-emerald-700 border border-emerald-500/60 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5 active:translate-y-0 transition duration-200 cursor-pointer backdrop-blur-sm"
            >
              <Sprout className="w-4 h-4 text-emerald-300" />
              <span>Post Harvest Surplus</span>
            </button>
          </div>

          {/* Real-time stats grid */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto text-left">
            <div className="bg-emerald-900/60 border border-emerald-700/50 p-4 rounded-2xl backdrop-blur-md hover:border-emerald-500/60 transition shadow-xs">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 block tracking-tight">35%–40%</span>
              <span className="text-xs text-emerald-200 font-medium">Post-Harvest Spoilage Target</span>
            </div>
            <div className="bg-emerald-900/60 border border-emerald-700/50 p-4 rounded-2xl backdrop-blur-md hover:border-emerald-500/60 transition shadow-xs">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-300 block tracking-tight">25</span>
              <span className="text-xs text-emerald-200 font-medium">Sri Lankan Districts</span>
            </div>
            <div className="bg-emerald-900/60 border border-emerald-700/50 p-4 rounded-2xl backdrop-blur-md hover:border-emerald-500/60 transition shadow-xs">
              <span className="text-2xl sm:text-3xl font-extrabold text-white block tracking-tight">0%</span>
              <span className="text-xs text-emerald-200 font-medium">Middleman Broker Fees</span>
            </div>
            <div className="bg-emerald-900/60 border border-emerald-700/50 p-4 rounded-2xl backdrop-blur-md hover:border-emerald-500/60 transition shadow-xs">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block tracking-tight">1920</span>
              <span className="text-xs text-emerald-200 font-medium">Govt Agri Advisory Helpline</span>
            </div>
          </div>
        </div>
      </section>

      {/* Sri Lankan Crisis & Solution Context */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1 rounded-full uppercase tracking-wider">
              The Sri Lankan Agricultural Problem
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Why Sri Lankan Farmers Face Devastating Losses
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              During peak harvest seasons in major vegetable and grain belts, supply chain bottlenecks lead to massive food spoilage while retail prices remain high in urban consumer centers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Box 1 */}
            <div className="bg-red-50/40 border border-red-100 rounded-2xl p-6 space-y-3 hover:shadow-md transition">
              <div className="p-3 bg-red-100 text-red-700 rounded-xl w-fit">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Regional Surpluses & Spoiled Crops</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Farmers in Nuwara Eliya and Dambulla often dump tons of fresh cabbages, leeks, and tomatoes at regional economic centres when farmgate offers crash to single-digit rupees.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-amber-50/40 border border-amber-100 rounded-2xl p-6 space-y-3 hover:shadow-md transition">
              <div className="p-3 bg-amber-100 text-amber-800 rounded-xl w-fit">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Extreme Price Asymmetry</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                While producers receive as little as Rs. 20–40/kg at farmgate, Colombo and Western Province retail buyers pay upwards of Rs. 250/kg due to multiple intermediary layers.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-emerald-50/50 border border-emerald-100 rounded-2xl p-6 space-y-3 hover:shadow-md transition">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl w-fit">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-gray-900">The Agri Lanka Direct Model</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                We provide a low-bandwidth digital board allowing direct farmer listings, instant transparent telephone contact, and real-time batch purchasing calculations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works for Both Sides */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Operational Workflow
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            How Agri Lanka Operates
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            Built specifically for Sri Lankan field conditions—fast, simple, and transparent.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Farmers */}
          <div className="bg-gradient-to-br from-emerald-50/70 to-white border border-emerald-200 rounded-3xl p-8 space-y-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-700 text-white rounded-2xl shadow-sm">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-emerald-700">For Producers</span>
                <h3 className="text-xl font-bold text-gray-900">Sri Lankan Farmers</h3>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-gray-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Post in 60 seconds:</strong> Enter crop name, category, quantity in kg, unit price (LKR), and district.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Automated batch value:</strong> System automatically calculates total lot price for wholesale buyers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Full lifecycle control:</strong> Mark lots as "Available" or "Sold" with one click to prevent spam calls.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Zero intermediary fees:</strong> Keep 100% of your agreed farmgate revenue.</span>
              </li>
            </ul>

            <button
              onClick={onNavigatePost}
              className="w-full py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-xs shadow-sm transition cursor-pointer"
            >
              Post a Harvest Listing Now
            </button>
          </div>

          {/* For Wholesale Buyers */}
          <div className="bg-gradient-to-br from-amber-50/50 to-white border border-amber-200 rounded-3xl p-8 space-y-6 shadow-sm hover:shadow-md transition">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-600 text-white rounded-2xl shadow-sm">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-amber-700">For Commercial Buyers</span>
                <h3 className="text-xl font-bold text-gray-900">Wholesale Buyers & Supermarkets</h3>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-gray-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>District-level discovery:</strong> Filter crops across all 25 Sri Lankan administrative districts.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Categorized produce:</strong> Real-time filtering across Vegetables, Fruits, Grains, and Spices.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Instant direct dial:</strong> One-tap phone button connects you straight to the verified farmer.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Fresh farmgate quality:</strong> Source direct from harvest locations without transit spoilage.</span>
              </li>
            </ul>

            <button
              onClick={onNavigateBrowse}
              className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-xl text-xs shadow-sm transition cursor-pointer"
            >
              Browse Active Produce Listings
            </button>
          </div>
        </div>
      </section>

      {/* Emergency Hotline & Government Advisory Notice */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
              National Agricultural Support
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Sri Lanka Department of Agriculture Advisory Service
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 max-w-2xl font-light">
              Need technical advice on crop harvesting, pest management, or official farmgate pricing guidelines? Call the free national toll-free hotline.
            </p>
          </div>

          <a
            href="tel:1920"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 px-6 py-3.5 rounded-xl font-extrabold text-sm shadow-md transition shrink-0"
          >
            <Phone className="w-5 h-5 text-emerald-950 animate-bounce" />
            <span>Call Helpline: 1920</span>
          </a>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="text-center max-w-3xl mx-auto px-4 space-y-6 pt-4">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Ready to trade fairly and reduce Sri Lankan food waste?
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Join registered Sri Lankan farmers and commercial produce buyers today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={onNavigateAuth}
            className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow-sm transition cursor-pointer"
          >
            Create Your Free Account
          </button>
          <button
            onClick={onNavigateBrowse}
            className="px-8 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold rounded-xl text-sm transition cursor-pointer"
          >
            Explore Marketplace
          </button>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
