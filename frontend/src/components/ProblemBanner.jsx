import React from 'react';
import { PhoneCall, Info } from 'lucide-react';

export const ProblemBanner = () => {
  return (
    <section className="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-50 border-b border-emerald-200/70 py-2.5 px-4 shadow-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Marketplace Notice */}
        <div className="flex items-start sm:items-center space-x-2.5 text-emerald-950 flex-1">
          <div className="p-1.5 bg-emerald-100 text-emerald-700 rounded-lg flex-shrink-0 mt-0.5 sm:mt-0">
            <Info className="w-4 h-4" />
          </div>
          <p className="leading-relaxed text-emerald-900">
            <span className="font-semibold text-emerald-950">Direct Agricultural Trade:</span> Connecting local farmers directly with wholesale buyers to reduce crop waste and support fair market prices across Sri Lanka.
          </p>
        </div>

        {/* Local Emergency Helpline Quick Dial */}
        <div className="flex items-center space-x-2 flex-shrink-0 self-start md:self-auto">
          <a
            href="tel:1920"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-medium text-xs sm:text-sm transition shadow-xs"
            title="Call Sri Lanka Department of Agriculture Toll-Free Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Agri Helpline: <strong>1920</strong></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProblemBanner;
