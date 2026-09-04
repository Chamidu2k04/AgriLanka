import React, { useState } from 'react';
import { Sprout, CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

/**
 * ===============================================================
 * POST LISTING PAGE (Assigned to: Member D - Post Form & Validation)
 * ===============================================================
 * Member D Tasks:
 * 1. Implement form controlled states (cropName, category, quantityKg, unitPriceLkr, district)
 * 2. Implement client-side validation (Rubric #5: Meaningful, friendly error messages):
 *    - cropName cannot be empty
 *    - category must be selected
 *    - quantityKg must be > 0
 *    - unitPriceLkr must be > 0
 *    - district must be selected
 * 3. Send POST /api/listings with JWT auth
 * 4. Show success banner and reset form / redirect to browse page
 * ===============================================================
 */

const CATEGORIES = ['Vegetables', 'Fruits', 'Grains', 'Spices'];
const DISTRICTS = [
  'Dambulla', 'Nuwara Eliya', 'Jaffna', 'Badulla', 'Welimada', 
  'Matale', 'Polonnaruwa', 'Kandy', 'Kurunegala', 'Anuradhapura', 
  'Hambantota', 'Monaragala', 'Puttalam', 'Ratnapura'
];

export const PostListingPage = ({ onListingCreated, onBackToBrowse }) => {
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    cropName: '',
    category: 'Vegetables',
    quantityKg: '',
    unitPriceLkr: '',
    district: user?.district || 'Dambulla',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // TODO: Member D - Validate form inputs
  const validateForm = () => {
    const newErrors = {};
    if (!formData.cropName.trim()) newErrors.cropName = 'Please provide a crop name (e.g., Red Tomatoes)';
    if (!formData.quantityKg || Number(formData.quantityKg) <= 0) newErrors.quantityKg = 'Quantity must be at least 1 kg';
    if (!formData.unitPriceLkr || Number(formData.unitPriceLkr) <= 0) newErrors.unitPriceLkr = 'Unit price must be greater than Rs. 0';
    if (!formData.district) newErrors.district = 'Please select a production district';
    return newErrors;
  };

  // TODO: Member D - Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if user is logged in
    if (!isAuthenticated) {
      setErrors({ form: 'You must be logged in as a Farmer to post a harvest batch.' });
      return;
    }

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccessMsg('');

    try {
      console.log('Member D TODO: Submitting harvest listing:', formData);

      // Example submission:
      // const res = await api.post('/listings', {
      //   ...formData,
      //   quantityKg: Number(formData.quantityKg),
      //   unitPriceLkr: Number(formData.unitPriceLkr),
      // });
      // setSuccessMsg('Harvest listing published successfully!');

      setSuccessMsg('Form submitted (TODO: Member D to hook to POST /api/listings)!');
      if (onListingCreated) onListingCreated();
    } catch (err) {
      setErrors({ form: err.message || 'Failed to publish harvest listing' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={onBackToBrowse}
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-800 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4 mr-1" />
        Back to Listings
      </button>

      {/* Card Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-2.5 bg-emerald-100 text-emerald-800 rounded-lg">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Post Harvest Surplus Batch</h1>
            <p className="text-xs sm:text-sm text-gray-500">
              Publish your crops directly to wholesale buyers without middleman cuts
            </p>
          </div>
        </div>

        {/* Auth Notice if not logged in */}
        {!isAuthenticated && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-800 text-sm flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Farmer Login Required:</span> You need to be logged into a Farmer account to post. You can still test the form layout.
            </div>
          </div>
        )}

        {/* Global Error Notice */}
        {errors.form && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{errors.form}</span>
          </div>
        )}

        {/* Success Notice */}
        {successMsg && (
          <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-sm flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Crop Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
              Crop Name *
            </label>
            <input
              type="text"
              name="cropName"
              placeholder="e.g. Nuwara Eliya Carrots, Dambulla Big Onions"
              value={formData.cropName}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                errors.cropName ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
              }`}
            />
            {errors.cropName && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.cropName}</p>
            )}
          </div>

          {/* Category & District Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-lg border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                District / Region *
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                  errors.district ? 'border-red-400' : 'border-gray-300'
                }`}
              >
                {DISTRICTS.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
              {errors.district && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.district}</p>
              )}
            </div>
          </div>

          {/* Quantity & Price Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Available Quantity (kg) *
              </label>
              <input
                type="number"
                name="quantityKg"
                placeholder="e.g. 250"
                min="1"
                value={formData.quantityKg}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                  errors.quantityKg ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
                }`}
              />
              {errors.quantityKg && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.quantityKg}</p>
              )}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                Wholesale Price Per kg (LKR) *
              </label>
              <input
                type="number"
                name="unitPriceLkr"
                placeholder="e.g. 180"
                min="1"
                value={formData.unitPriceLkr}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-lg border text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                  errors.unitPriceLkr ? 'border-red-400 bg-red-50/30' : 'border-gray-300'
                }`}
              />
              {errors.unitPriceLkr && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.unitPriceLkr}</p>
              )}
            </div>
          </div>

          {/* Estimated Batch Value Preview */}
          {formData.quantityKg > 0 && formData.unitPriceLkr > 0 && (
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex justify-between items-center text-sm">
              <span className="text-emerald-800 font-medium">Estimated Total Batch Value:</span>
              <span className="text-emerald-950 font-bold text-base">
                Rs. {(Number(formData.quantityKg) * Number(formData.unitPriceLkr)).toLocaleString()}
              </span>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-4 rounded-lg transition shadow-sm disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              <Sprout className="w-5 h-5" />
              <span>{loading ? 'Publishing...' : 'Publish Harvest Batch'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostListingPage;
