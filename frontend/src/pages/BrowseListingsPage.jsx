import React, { useState, useEffect } from 'react';
import { Search, Filter, RefreshCw, AlertCircle } from 'lucide-react';
import ListingCard from '../components/ListingCard';
import api from '../services/api';

/**
 * ===============================================================
 * BROWSE LISTINGS PAGE (Assigned to: Member B - Browse & Filter Slice)
 * ===============================================================
 * Member B Tasks:
 * 1. Fetch listings from backend API (GET /api/listings?search=&category=&district=)
 * 2. Implement real-time or debounce search by cropName
 * 3. Implement category pill filters: All, Vegetables, Fruits, Grains, Spices
 * 4. Implement district filter dropdown (Dambulla, Nuwara Eliya, Jaffna, Badulla, etc.)
 * 5. Handle loading and empty states cleanly
 * 6. Map results into <ListingCard key={item._id} listing={item} />
 * ===============================================================
 */

const CATEGORIES = ['All', 'Vegetables', 'Fruits', 'Grains', 'Spices'];
const DISTRICTS = ['All Districts', 'Dambulla', 'Nuwara Eliya', 'Jaffna', 'Badulla', 'Welimada', 'Matale', 'Polonnaruwa', 'Kandy', 'Kurunegala'];

export const BrowseListingsPage = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDistrict, setSelectedDistrict] = useState('All Districts');

  // TODO: Member B - Implement fetchListings function
  const fetchListings = async () => {
    setLoading(true);
    setError(null);
    try {
      // Build query params
      const params = new URLSearchParams();
      if (searchQuery) params.append('search', searchQuery);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (selectedDistrict !== 'All Districts') params.append('district', selectedDistrict);

      // Example API call:
      // const res = await api.get(`/listings?${params.toString()}`);
      // setListings(res.data || []);
      
      console.log('Member B TODO: Fetch listings with params:', params.toString());

      // TEMPORARY FALLBACK SAMPLE DATA so UI is immediately visible to preview
      setListings([
        {
          _id: 'mock-1',
          cropName: 'Dambulla Red Tomatoes',
          category: 'Vegetables',
          quantityKg: 350,
          unitPriceLkr: 220,
          district: 'Dambulla',
          farmerName: 'Bandara Senanayake',
          farmerPhone: '0771234567',
          status: 'Available',
          createdAt: new Date().toISOString(),
        },
        {
          _id: 'mock-2',
          cropName: 'Nuwara Eliya Leeks',
          category: 'Vegetables',
          quantityKg: 500,
          unitPriceLkr: 180,
          district: 'Nuwara Eliya',
          farmerName: 'Bandara Senanayake',
          farmerPhone: '0771234567',
          status: 'Available',
          createdAt: new Date().toISOString(),
        },
        {
          _id: 'mock-3',
          cropName: 'Jaffna Red Onions',
          category: 'Vegetables',
          quantityKg: 400,
          unitPriceLkr: 450,
          district: 'Jaffna',
          farmerName: 'Kuganathan Nadarajah',
          farmerPhone: '0719876543',
          status: 'Sold',
          createdAt: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setError(err.message || 'Failed to load harvest listings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, [selectedCategory, selectedDistrict]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
          Live Harvest Trade Board
        </h1>
        <p className="text-sm text-gray-600 mt-1">
          Direct surplus agricultural produce from verified Sri Lankan farmers
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6 space-y-4">
        {/* Search Bar and District Dropdown */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by crop name (e.g. Tomatoes, Leeks, Onions)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && fetchListings()}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="py-2 px-3 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            >
              {DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>

            <button
              onClick={fetchListings}
              className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
              title="Refresh Listings"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 pt-1 border-t border-gray-100">
          <span className="text-xs font-semibold text-gray-400 self-center mr-1">Category:</span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition ${
                selectedCategory === cat
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Error Notice */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 flex items-center gap-2 text-sm">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Listings Grid */}
      {loading ? (
        <div className="text-center py-16 text-gray-500">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto text-emerald-600 mb-2" />
          <p className="text-sm">Loading harvest batches...</p>
        </div>
      ) : listings.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-gray-200 p-8">
          <p className="text-gray-500 font-medium">No harvest listings match your criteria.</p>
          <button
            onClick={() => { setSelectedCategory('All'); setSelectedDistrict('All Districts'); setSearchQuery(''); fetchListings(); }}
            className="mt-3 text-emerald-600 hover:underline text-sm font-semibold"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {listings.map((item) => (
            <ListingCard
              key={item._id}
              listing={item}
              onStatusChange={(id, newStatus) => console.log('Member C: toggle status', id, newStatus)}
              onDelete={(id) => console.log('Member C: delete listing', id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseListingsPage;
