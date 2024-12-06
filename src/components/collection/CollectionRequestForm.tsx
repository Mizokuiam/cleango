import React, { useState } from 'react';
import { X, Calendar } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../ui/Button';
import { WASTE_TYPES } from '../../lib/constants';

interface CollectionRequestFormProps {
  onSuccess: () => void;
  onClose: () => void;
}

const CollectionRequestForm: React.FC<CollectionRequestFormProps> = ({ onSuccess, onClose }) => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    address: '',
    name: '',
    phone: '',
    email: user?.email || '',
    collectionTime: 'morning',
    collectionDate: '',
    subscriptionType: 'single',
    wasteType: '',
    wasteItems: [] as string[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const { error } = await supabase
        .from('collection_requests')
        .insert({
          user_id: user?.id,
          address: formData.address,
          contact_details: {
            name: formData.name,
            phone: formData.phone,
            email: formData.email
          },
          collection_time: formData.collectionTime,
          collection_date: formData.collectionDate,
          subscription_type: formData.subscriptionType,
          waste_type: formData.wasteType,
          waste_items: formData.wasteItems,
          status: 'pending'
        });

      if (error) throw error;
      
      onSuccess();
      onClose();
    } catch (error) {
      console.error('Error submitting request:', error);
    }
  };

  const handleWasteTypeChange = (type: string) => {
    setFormData(prev => ({
      ...prev,
      wasteType: type,
      wasteItems: []
    }));
  };

  const handleWasteItemToggle = (item: string) => {
    setFormData(prev => ({
      ...prev,
      wasteItems: prev.wasteItems.includes(item)
        ? prev.wasteItems.filter(i => i !== item)
        : [...prev.wasteItems, item]
    }));
  };

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background-dark/80 backdrop-blur-sm p-4">
      <div className="relative bg-background-light rounded-xl border border-primary/20 p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">New Collection Request</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Full Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md bg-background-dark border-primary/20 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Phone Number</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 block w-full rounded-md bg-background-dark border-primary/20 text-white"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300">Address</label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                className="mt-1 block w-full rounded-md bg-background-dark border-primary/20 text-white"
                rows={2}
                required
              />
            </div>
          </div>

          {/* Collection Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Collection Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">Collection Date</label>
                <div className="relative mt-1">
                  <input
                    type="date"
                    value={formData.collectionDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, collectionDate: e.target.value }))}
                    className="block w-full rounded-md bg-background-dark border-primary/20 text-white pr-10"
                    min={today}
                    required
                  />
                  <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">Collection Time</label>
                <select
                  value={formData.collectionTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, collectionTime: e.target.value }))}
                  className="mt-1 block w-full rounded-md bg-background-dark border-primary/20 text-white"
                  required
                >
                  <option value="morning">Morning (7:00 AM)</option>
                  <option value="evening">Evening (10:00 PM)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Subscription Type */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Subscription Type</h3>
            <div className="grid grid-cols-3 gap-4">
              {['single', 'monthly', 'annual'].map((type) => (
                <label
                  key={type}
                  className={`flex items-center justify-center p-4 rounded-lg border cursor-pointer transition-colors ${
                    formData.subscriptionType === type
                      ? 'border-primary bg-primary/10 text-primary-light'
                      : 'border-primary/20 bg-background-dark text-gray-400 hover:border-primary/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="subscriptionType"
                    value={type}
                    checked={formData.subscriptionType === type}
                    onChange={(e) => setFormData(prev => ({ ...prev, subscriptionType: e.target.value }))}
                    className="sr-only"
                  />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Waste Type Selection */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Waste Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(WASTE_TYPES).map(([key, { label }]) => (
                <label
                  key={key}
                  className={`flex items-center p-4 rounded-lg border cursor-pointer transition-colors ${
                    formData.wasteType === key
                      ? 'border-primary bg-primary/10 text-primary-light'
                      : 'border-primary/20 bg-background-dark text-gray-400 hover:border-primary/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="wasteType"
                    value={key}
                    checked={formData.wasteType === key}
                    onChange={(e) => handleWasteTypeChange(e.target.value)}
                    className="sr-only"
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Waste Items */}
          {formData.wasteType && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-white">Waste Items</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {WASTE_TYPES[formData.wasteType as keyof typeof WASTE_TYPES].items.map((item) => (
                  <label
                    key={item}
                    className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                      formData.wasteItems.includes(item)
                        ? 'border-primary bg-primary/10 text-primary-light'
                        : 'border-primary/20 bg-background-dark text-gray-400 hover:border-primary/40'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={formData.wasteItems.includes(item)}
                      onChange={() => handleWasteItemToggle(item)}
                      className="sr-only"
                    />
                    <span className="text-sm">{item}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-4 mt-8">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Submit Request
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CollectionRequestForm;