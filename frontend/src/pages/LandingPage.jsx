import React from 'react';
import { 
  Sprout, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  Truck, 
  Phone,
  HeartHandshake,
  Sparkles
} from 'lucide-react';

export const LandingPage = ({ onNavigateBrowse, onNavigateAuth }) => {
  return (
    <div className="space-y-16 pb-20 overflow-hidden">
      {/* Hero Section */}
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
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Direct Agricultural Marketplace for Sri Lanka</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
            Connecting Farmers & Wholesale Buyers. <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-green-200 to-amber-300 drop-shadow-sm">
              Fair Trade. Less Waste.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 max-w-3xl mx-auto leading-relaxed font-normal">
            AgriLanka connects farmers across Sri Lanka directly with wholesale buyers, retailers, and restaurants. Discover and trade fresh produce with transparent pricing and zero middlemen fees.
          </p>

          {/* Action Button */}
          <div className="pt-3 flex justify-center items-center">
            <button
              onClick={onNavigateBrowse}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-sm font-bold bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-emerald-950 shadow-lg shadow-amber-400/20 hover:shadow-xl transform hover:-translate-y-0.5 active:translate-y-0 transition duration-200 cursor-pointer"
            >
              <span>Explore Produce Marketplace</span>
              <ArrowRight className="w-4 h-4 text-emerald-950" />
            </button>
          </div>

          {/* Key Stats */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-3.5 max-w-4xl mx-auto text-left">
            <div className="bg-emerald-900/60 border border-emerald-700/50 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-extrabold text-amber-300 block tracking-tight">Up to 40%</span>
              <span className="text-xs text-emerald-200 font-medium">Reduced Crop Spoilage</span>
            </div>
            <div className="bg-emerald-900/60 border border-emerald-700/50 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-300 block tracking-tight">25</span>
              <span className="text-xs text-emerald-200 font-medium">Districts Covered</span>
            </div>
            <div className="bg-emerald-900/60 border border-emerald-700/50 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-extrabold text-white block tracking-tight">0%</span>
              <span className="text-xs text-emerald-200 font-medium">Intermediary Broker Fees</span>
            </div>
            <div className="bg-emerald-900/60 border border-emerald-700/50 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400 block tracking-tight">1920</span>
              <span className="text-xs text-emerald-200 font-medium">National Advisory Helpline</span>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution Overview */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 shadow-sm">
          <div className="text-center max-w-3xl mx-auto space-y-3 mb-12">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
              Market Challenges
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Bridging the Agricultural Supply Gap
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              In traditional supply chains, smallholder farmers often struggle with sudden price drops and spoilage during peak harvest, while urban consumers pay high retail markups.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-6 space-y-3">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl w-fit">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Preventing Produce Spoilage</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Direct listing gives farmers an immediate digital showcase for their harvests, connecting them with commercial buyers before perishable crops spoil.
              </p>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-6 space-y-3">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl w-fit">
                <Scale className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Fair & Transparent Rates</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Transparent wholesale pricing ensures farmers earn what their labor deserves while providing buyers with competitive wholesale rates.
              </p>
            </div>

            <div className="bg-emerald-50/40 border border-emerald-100 rounded-2xl p-6 space-y-3">
              <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl w-fit">
                <HeartHandshake className="w-6 h-6 text-emerald-700" />
              </div>
              <h3 className="text-base font-bold text-gray-900">Direct Farmer Contact</h3>
              <p className="text-xs text-gray-600 leading-relaxed">
                Buyers can reach verified farmers directly via phone or WhatsApp to agree on logistics and purchase details with zero commission deductions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Platform Features
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
            How AgriLanka Works
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            A practical, streamlined platform designed for both producers and commercial buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* For Farmers */}
          <div className="bg-gradient-to-br from-emerald-50/70 to-white border border-emerald-200 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-emerald-700 text-white rounded-2xl shadow-sm">
                <Sprout className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-emerald-700">For Producers</span>
                <h3 className="text-xl font-bold text-gray-900">Farmers & Growers</h3>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-gray-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Quick produce listing:</strong> Enter crop name, category, quantity in kilograms, price per kg, and location.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Automated batch calculations:</strong> Total lot value is automatically calculated for prospective wholesale buyers.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Manage status anytime:</strong> Mark batches as Available or Sold with one click to keep your inventory accurate.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Zero broker commission:</strong> Keep 100% of your agreed sale price.</span>
              </li>
            </ul>
          </div>

          {/* For Wholesale Buyers */}
          <div className="bg-gradient-to-br from-amber-50/50 to-white border border-amber-200 rounded-3xl p-8 space-y-6 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-amber-600 text-white rounded-2xl shadow-sm">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-semibold uppercase text-amber-700">For Commercial Buyers</span>
                <h3 className="text-xl font-bold text-gray-900">Wholesalers & Supermarkets</h3>
              </div>
            </div>

            <ul className="space-y-3.5 text-xs text-gray-700">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>District discovery:</strong> Filter fresh produce across all 25 districts in Sri Lanka.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Category filtering:</strong> Find Vegetables, Fruits, Grains, and Spices instantly.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Direct contact options:</strong> Reach verified growers directly by telephone or WhatsApp.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span><strong>Fresh farmgate quality:</strong> Source fresh batches directly from harvest centers.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Advisory Notice */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800 shadow-lg">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">
              National Agricultural Support
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Department of Agriculture Advisory Service
            </h3>
            <p className="text-xs sm:text-sm text-emerald-200 max-w-2xl font-light">
              Need guidance on harvesting practices, pest management, or official crop guidelines? Call the national toll-free helpline.
            </p>
          </div>

          <a
            href="tel:1920"
            className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-emerald-950 px-6 py-3.5 rounded-xl font-extrabold text-sm shadow-md transition shrink-0"
          >
            <Phone className="w-5 h-5 text-emerald-950" />
            <span>Call Helpline: 1920</span>
          </a>
        </div>
      </section>

      {/* Call to Action */}
      <section className="text-center max-w-3xl mx-auto px-4 space-y-6 pt-4">
        <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
          Ready to trade fresh produce directly?
        </h2>
        <p className="text-xs sm:text-sm text-gray-600">
          Connect with registered farmers and wholesale buyers today.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <button
            onClick={onNavigateAuth}
            className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm shadow-sm transition cursor-pointer"
          >
            Create Free Account
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
