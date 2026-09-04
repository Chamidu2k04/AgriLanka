import React from 'react';
import { AlertTriangle, PhoneCall, ShieldCheck, TrendingDown } from 'lucide-react';

/**
 * ===============================================================
 * PROBLEM BANNER COMPONENT (Assigned to: Member D - Post Form & Infra)
 * ===============================================================
 * Satisfies Rubric Requirements:
 * - #2: In-app Sri Lankan problem context (Dambulla, Jaffna, Welimada post-harvest loss)
 * - #10: Demonstrated local value & Emergency Sri Lanka Agri Helpline (1920)
 * ===============================================================
 */

export const ProblemBanner = () => {
  return (
    <section className="bg-gradient-to-r from-amber-50 via-emerald-50/60 to-amber-50 border-b border-amber-200/70 py-3 px-4 shadow-xs">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Sri Lankan Crisis Problem Statement */}
        <div className="flex items-start sm:items-center space-x-2.5 text-amber-950 flex-1">
          <div className="p-1.5 bg-amber-100/90 text-amber-700 rounded-lg flex-shrink-0 mt-0.5 sm:mt-0">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <p className="leading-relaxed">
            <span className="font-bold text-amber-900">Sri Lanka Crisis Context:</span> In major agricultural hubs (Dambulla, Jaffna & Welimada), 
            up to <span className="font-extrabold text-red-600 bg-red-50 px-1 py-0.5 rounded border border-red-200">30%–40%</span> of fresh harvest spoils due to middleman exploitation and lack of direct market access. 
            Agri Lanka links smallholder farmers directly to wholesale buyers at transparent fair prices.
          </p>
        </div>

        {/* Local Emergency Helpline Quick Dial */}
        <div className="flex items-center space-x-2 flex-shrink-0 self-start md:self-auto">
          <a
            href="tel:1920"
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg font-medium text-xs sm:text-sm transition shadow-xs"
            title="Call Sri Lanka Department of Agriculture Toll-Free Helpline"
          >
            <PhoneCall className="w-3.5 h-3.5 animate-pulse" />
            <span>Govt Agri Helpline: <strong>1920</strong></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProblemBanner;
