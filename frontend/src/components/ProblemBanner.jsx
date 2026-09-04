import React from 'react';
import { AlertTriangle, PhoneCall, ShieldCheck } from 'lucide-react';

/**
 * ===============================================================
 * PROBLEM BANNER COMPONENT (Assigned to: Member D)
 * ===============================================================
 * Satisfies Rubric Requirements:
 * - #2: In-app Sri Lankan problem context (Dambulla, Jaffna post-harvest loss)
 * - #10: Demonstrated local value & Emergency Agri Helpline (1920)
 * ===============================================================
 */

export const ProblemBanner = () => {
  return (
    <section className="bg-gradient-to-r from-amber-50 to-emerald-50 border-b border-amber-200/60 py-3 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Sri Lankan Problem Statement */}
        <div className="flex items-center space-x-2 text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0" />
          <p>
            <span className="font-semibold">Sri Lanka Crisis Response:</span> In Dambulla, Jaffna & Welimada, 
            up to <span className="font-bold text-red-600">30%–40%</span> of harvests spoil due to middleman bottlenecks. 
            Agri Lanka enables direct wholesale farm-to-buyer sales at fair prices.
          </p>
        </div>

        {/* Local Emergency Helpline Quick Dial */}
        <div className="flex items-center space-x-3 flex-shrink-0 self-end sm:self-auto">
          <a
            href="tel:1920"
            className="inline-flex items-center space-x-1.5 px-3 py-1 bg-emerald-700 text-white rounded-full font-medium hover:bg-emerald-800 transition shadow-sm"
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Govt Agri Helpline: 1920</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProblemBanner;
