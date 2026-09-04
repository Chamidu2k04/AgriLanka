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

  // Fetch listings from backend API
  const fetchListings = async () => {
    setLoading(true);
    setError(null);
    try {
      // Build query params
      const params = new URLSearchParams();
      if (searchQuery.trim()) params.append('search', searchQuery.trim());
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (selectedDistrict !== 'All Districts') params.append('district', selectedDistrict);

      const queryString = params.toString();
      const endpoint = queryString ? `/listings?${queryString}` : '/listings';
      
      const response = await api.get(endpoint);
      if (response && response.success) {
        setListings(response.data || []);
      } else {
        setListings(response?.data || []);
      }
    } catch (err) {
      console.error('Fetch listings error:', err);
      setError(err.message || 'Failed to load harvest listings');
    } finally {
      setLoading(false);
    }
  };

  // Debounce search input for instant filtering
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchListings();
    }, 350);
    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedDistrict]);

  // Aggregate metrics (Rubric #6: Process/Calculate information)
  const totalStockKg = listings.reduce((sum, item) => sum + (Number(item.quantityKg) || 0), 0);
  const totalValueLkr = listings.reduce((sum, item) => sum + ((Number(item.quantityKg) || 0) * (Number(item.unitPriceLkr) || 0)), 0);
  const availableLots = listings.filter((item) => item.status !== 'Sold').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Live Harvest Trade Board
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Direct surplus agricultural produce from verified Sri Lankan farmers
          </p>
        </div>

        {/* Quick Summary Badges */}
        <div className="flex items-center gap-2">
          <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-xs text-emerald-800 font-medium">
            <strong>{availableLots}</strong> Active Lots ({totalStockKg.toLocaleString()} kg)
          </div>
          <div className="hidden md:block bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-xs text-amber-800 font-medium">
            Total Trade Value: <strong>Rs. {totalValueLkr.toLocaleString()}</strong>
          </div>
        </div>
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
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="py-2 px-3 border border-gray-300 rounded-lg text-sm bg-white text-gray-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none cursor-pointer"
            >
              {DISTRICTS.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>

            <button
              onClick={fetchListings}
              className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
              title="Refresh Listings"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
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
              className={`px-3 py-1 rounded-full text-xs font-medium transition cursor-pointer ${
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
              onStatusChange={() => fetchListings()}
              onDelete={() => fetchListings()}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseListingsPage;
