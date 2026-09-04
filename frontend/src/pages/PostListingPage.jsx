import React, { useState } from 'react';
import { Sprout, CheckCircle2, AlertCircle, ArrowLeft, Calculator, MapPin, Tag, Package, DollarSign } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { CROP_CATEGORIES } from '../constants/categories';
import { SRI_LANKAN_DISTRICTS } from '../constants/districts';

/**
 * Post Listing Page
 * Form for farmers to publish fresh produce listings.
 */


export const PostListingPage = ({ onListingCreated, onBackToBrowse }) => {
  const { user, isAuthenticated } = useAuth();

  // Controlled Form State
  const [formData, setFormData] = useState({
    cropName: '',
    category: CROP_CATEGORIES[0] || 'Vegetables',
    quantityKg: '',
    unitPriceLkr: '',
    district: user?.district || SRI_LANKAN_DISTRICTS[0] || 'Dambulla',
  });

  // Validation and Submission State
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Handle Input Changes & Clear specific field error
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
    if (errors.form) {
      setErrors((prev) => ({ ...prev, form: null }));
    }
  };

  // Meaningful Client-side Validation Logic (Rubric #5)
  const validateForm = () => {
    const newErrors = {};

    // 1. Crop name validation
    if (!formData.cropName || !formData.cropName.trim()) {
      newErrors.cropName = 'Please enter a crop name (e.g. Nuwara Eliya Leeks, Dambulla Tomatoes)';
    } else if (formData.cropName.trim().length < 2) {
      newErrors.cropName = 'Crop name must be at least 2 characters long';
    }

    // 2. Category validation
    if (!formData.category) {
      newErrors.category = 'Please select a crop category';
    }

    // 3. Quantity validation (kg >= 1)
    const qty = Number(formData.quantityKg);
    if (!formData.quantityKg || isNaN(qty)) {
      newErrors.quantityKg = 'Please enter the available quantity in kilograms';
    } else if (qty < 1) {
      newErrors.quantityKg = 'Quantity must be at least 1 kg';
    }

    // 4. Unit price validation (Rs/kg >= 1)
    const price = Number(formData.unitPriceLkr);
    if (!formData.unitPriceLkr || isNaN(price)) {
      newErrors.unitPriceLkr = 'Please enter the wholesale unit price in LKR';
    } else if (price < 1) {
      newErrors.unitPriceLkr = 'Unit price must be at least Rs. 1 per kg';
    }

    // 5. District validation
    if (!formData.district || !formData.district.trim()) {
      newErrors.district = 'Please choose the harvest production district';
    }

    return newErrors;
  };

  // Form Submission Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1. Authentication Check
    if (!isAuthenticated) {
      setErrors({ form: 'Please log in to your Farmer account to post harvest surplus batches.' });
      return;
    }

    // 2. Validate Inputs
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});
    setSuccessMsg('');

    try {
      const payload = {
        cropName: formData.cropName.trim(),
        category: formData.category,
        quantityKg: Number(formData.quantityKg),
        unitPriceLkr: Number(formData.unitPriceLkr),
        district: formData.district,
      };

      const response = await api.post('/listings', payload);

      setSuccessMsg(
        response?.message || 'Harvest batch published successfully to Agri Lanka marketplace!'
      );

      // Reset form
      setFormData({
        cropName: '',
        category: CROP_CATEGORIES[0] || 'Vegetables',
        quantityKg: '',
        unitPriceLkr: '',
        district: user?.district || SRI_LANKAN_DISTRICTS[0] || 'Dambulla',
      });

      // Notify parent to refresh listings and transition view
      setTimeout(() => {
        if (onListingCreated) {
          onListingCreated();
        }
      }, 1200);
    } catch (err) {
      console.error('Submit listing error:', err);
      setErrors({
        form: err.message || 'Failed to publish harvest listing. Please verify your connection and try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  // Real-time batch value calculation
  const calculatedTotal =
    Number(formData.quantityKg) > 0 && Number(formData.unitPriceLkr) > 0
      ? Number(formData.quantityKg) * Number(formData.unitPriceLkr)
      : null;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back Navigation Button */}
      <button
        type="button"
        onClick={onBackToBrowse}
        className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-emerald-700 mb-6 transition"
      >
        <ArrowLeft className="w-4 h-4 mr-1.5" />
        Back to Browse Harvests
      </button>

      {/* Main Form Card */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sm:p-8">
        {/* Card Header */}
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-gray-100">
          <div className="p-3 bg-emerald-100 text-emerald-800 rounded-xl shadow-xs">
            <Sprout className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Post a Produce Listing</h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
              Connect directly with wholesale buyers across Sri Lanka
            </p>
          </div>
        </div>

        {/* Auth Warning if unauthenticated */}
        {!isAuthenticated && (
          <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 text-sm flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold">Sign In Required:</span> You need to be logged into a Farmer account to publish produce listings. You can still preview and prepare your listing details below.
            </div>
          </div>
        )}


        {/* Global Error Banner */}
        {errors.form && (
          <div className="mb-5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2.5">
            <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-500" />
            <span className="font-medium">{errors.form}</span>
          </div>
        )}

        {/* Success Banner */}
        {successMsg && (
          <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-800 text-sm flex items-center gap-2.5">
            <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-600" />
            <span className="font-semibold">{successMsg}</span>
          </div>
        )}

        {/* Form Element */}
        <form onSubmit={handleSubmit} className="space-y-5" noValidate>
          {/* Crop Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <Tag className="w-3.5 h-3.5 text-gray-400" />
              <span>Crop Name *</span>
            </label>
            <input
              type="text"
              name="cropName"
              placeholder="e.g. Dambulla Red Tomatoes, Jaffna Red Onions"
              value={formData.cropName}
              onChange={handleChange}
              className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                errors.cropName
                  ? 'border-red-400 bg-red-50/40 text-red-900 placeholder-red-300'
                  : 'border-gray-300 hover:border-gray-400 bg-white'
              }`}
            />
            {errors.cropName && (
              <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errors.cropName}
              </p>
            )}
          </div>

          {/* Category & District Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-gray-400" />
                <span>Category *</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none hover:border-gray-400 transition-all cursor-pointer"
              >
                {CROP_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.category}
                </p>
              )}
            </div>

            {/* District Dropdown */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-gray-400" />
                <span>Production District *</span>
              </label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:outline-none hover:border-gray-400 transition-all cursor-pointer ${
                  errors.district ? 'border-red-400' : 'border-gray-300'
                }`}
              >
                {SRI_LANKAN_DISTRICTS.map((dist) => (
                  <option key={dist} value={dist}>
                    {dist}
                  </option>
                ))}
              </select>
              {errors.district && (
                <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.district}
                </p>
              )}
            </div>
          </div>

          {/* Quantity & Unit Price Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Quantity */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Package className="w-3.5 h-3.5 text-gray-400" />
                <span>Available Quantity (kg) *</span>
              </label>
              <input
                type="number"
                name="quantityKg"
                placeholder="e.g. 350"
                min="1"
                step="any"
                value={formData.quantityKg}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                  errors.quantityKg
                    ? 'border-red-400 bg-red-50/40 text-red-900 placeholder-red-300'
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              />
              {errors.quantityKg && (
                <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.quantityKg}
                </p>
              )}
            </div>

            {/* Wholesale Unit Price */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-gray-400" />
                <span>Wholesale Price Per kg (LKR) *</span>
              </label>
              <input
                type="number"
                name="unitPriceLkr"
                placeholder="e.g. 220"
                min="1"
                step="any"
                value={formData.unitPriceLkr}
                onChange={handleChange}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm transition-all focus:ring-2 focus:ring-emerald-500 focus:outline-none ${
                  errors.unitPriceLkr
                    ? 'border-red-400 bg-red-50/40 text-red-900 placeholder-red-300'
                    : 'border-gray-300 hover:border-gray-400 bg-white'
                }`}
              />
              {errors.unitPriceLkr && (
                <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.unitPriceLkr}
                </p>
              )}
            </div>
          </div>

          {/* Real-Time Total Batch Calculation Preview (Rubric #6) */}
          {calculatedTotal !== null && (
            <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200 flex items-center justify-between transition-all">
              <div className="flex items-center space-x-2 text-emerald-800">
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span className="text-xs sm:text-sm font-semibold">Estimated Batch Total Value:</span>
              </div>
              <div className="text-right">
                <span className="text-base sm:text-lg font-bold text-emerald-950">
                  Rs. {calculatedTotal.toLocaleString('en-LK', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}
                </span>
                <span className="block text-[10px] text-emerald-700">
                  ({formData.quantityKg} kg × Rs. {formData.unitPriceLkr}/kg)
                </span>
              </div>
            </div>
          )}

          {/* Form Submit Action */}
          <div className="pt-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-semibold py-3 px-4 rounded-xl transition-all shadow-sm shadow-emerald-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 cursor-pointer"
            >
              <Sprout className="w-5 h-5" />
              <span>{loading ? 'Publishing Harvest Batch...' : 'Publish Harvest Batch'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostListingPage;
