import React, { useState } from 'react';
import { MapPin, Phone, MessageCircle, CheckCircle, Tag, Trash2, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

/**
 * Listing Card Component
 * Displays produce details, pricing, batch calculations, and contact actions.
 */


export const ListingCard = ({ listing, onStatusChange, onDelete }) => {
  const { user } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  // Safety fallback if no listing passed
  if (!listing) return null;

  // Check if logged in user is the owner of this harvest listing
  const isOwner = user && String(user._id || user.id) === String(listing.farmerId);

  const quantity = Number(listing.quantityKg) || 0;
  const unitPrice = Number(listing.unitPriceLkr) || 0;
  const totalBatchValue = quantity * unitPrice;

  const status = listing.status || 'Available';
  const isSold = status === 'Sold';
  const cleanedPhone = String(listing.farmerPhone || '').replace(/\D/g, '').replace(/^94/, '').replace(/^0/, '');

  const handleStatusChange = async () => {
    const newStatus = isSold ? 'Available' : 'Sold';
    setIsUpdating(true);
    try {
      await api.patch(`/listings/${listing._id}/status`, { status: newStatus });
      onStatusChange?.(listing._id, newStatus);
    } catch (error) {
      window.alert(error.message);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this listing?')) return;

    setIsUpdating(true);
    try {
      await api.delete(`/listings/${listing._id}`);
      onDelete?.(listing._id);
    } catch (error) {
      window.alert(error.message);
      setIsUpdating(false);
    }
  };

  return (
    <div className={`bg-white rounded-xl shadow-sm border transition duration-200 overflow-hidden flex flex-col justify-between ${
      isSold ? 'border-gray-200 opacity-75 bg-gray-50' : 'border-gray-200 hover:border-emerald-300 hover:shadow-md'
    }`}>
      {/* Card Header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-1">
              {listing.category || 'Produce'}
            </span>
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">
              {listing.cropName}
            </h3>
          </div>
          
          {/* Status Badge */}
          <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
            isSold 
              ? 'bg-gray-200 text-gray-700' 
              : 'bg-green-100 text-green-800 animate-pulse'
          }`}>
            {status}
          </span>
        </div>

        {/* Location & Farmer info */}
        <div className="text-xs text-gray-500 space-y-1 my-3">
          <div className="flex items-center space-x-1">
            <MapPin className="w-3.5 h-3.5 text-gray-400" />
            <span>District: <strong className="text-gray-700">{listing.district}</strong></span>
          </div>
          <div className="flex items-center space-x-1">
            <Tag className="w-3.5 h-3.5 text-gray-400" />
            <span>Farmer: <strong className="text-gray-700">{listing.farmerName}</strong></span>
          </div>
          {listing.createdAt && (
            <div className="flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-gray-400" />
              <span>Listed: {new Date(listing.createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>

        {/* Price & Quantity Grid */}
        <div className="grid grid-cols-2 gap-2 p-3 bg-emerald-50/50 rounded-lg border border-emerald-100/80 my-3">
          <div>
            <span className="text-xs text-gray-500 block">Available Stock</span>
            <span className="text-base font-bold text-gray-900">{quantity.toLocaleString()} kg</span>
          </div>
          <div>
            <span className="text-xs text-gray-500 block">Wholesale Rate</span>
            <span className="text-base font-bold text-emerald-700">Rs. {unitPrice.toLocaleString()} <span className="text-xs font-normal">/kg</span></span>
          </div>
        </div>

        {/* Batch Calculation (Rubric Requirement #6: Calculate) */}
        <div className="p-3 bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-between">
          <span className="text-xs font-medium text-gray-600">Total Batch Value:</span>
          <span className="text-base font-black text-gray-900">
            Rs. {totalBatchValue.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Card Actions & Contacts */}
      <div className="px-5 pb-5 pt-0 space-y-2">
        {/* Direct Contact Buttons (Phone / WhatsApp) */}
        <div className="grid grid-cols-2 gap-2">
          <a
            href={`tel:${listing.farmerPhone}`}
            className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg border border-gray-300 text-xs font-semibold text-gray-700 hover:bg-gray-100 transition"
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600" />
            <span>Call Farmer</span>
          </a>

          <a
            href={`https://wa.me/94${cleanedPhone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-1.5 py-2 px-3 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition"
          >
            <MessageCircle className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Owner Controls (Only visible to listing creator) */}
        {isOwner && (
          <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
            <button
              onClick={handleStatusChange}
              disabled={isUpdating}
              className={`flex-1 py-1.5 px-3 rounded-md text-xs font-semibold flex items-center justify-center space-x-1 transition ${
                isSold 
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200' 
                  : 'bg-gray-800 text-white hover:bg-gray-900'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{isSold ? 'Reactivate as Available' : 'Mark as Sold'}</span>
            </button>

            <button
              onClick={handleDelete}
              disabled={isUpdating}
              className="py-1.5 px-2.5 rounded-md text-xs font-semibold text-red-600 hover:bg-red-50 border border-red-200 transition"
              title="Delete Listing"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;
