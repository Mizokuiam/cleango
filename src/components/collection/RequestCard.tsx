import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Trash2, CheckCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';
import type { CollectionRequest } from '../../lib/types';

interface RequestCardProps {
  request: CollectionRequest;
  onStatusUpdate?: () => void;
}

const RequestCard: React.FC<RequestCardProps> = ({ request, onStatusUpdate }) => {
  const { user } = useAuth();
  const isProvider = user?.role === 'provider';

  const statusColors = {
    pending: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    accepted: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    completed: 'bg-green-500/10 text-green-500 border-green-500/20',
    cancelled: 'bg-red-500/10 text-red-500 border-red-500/20',
  };

  const handleStatusUpdate = async (newStatus: 'accepted' | 'completed' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('collection_requests')
        .update({ status: newStatus })
        .eq('id', request.id);

      if (error) throw error;
      if (onStatusUpdate) onStatusUpdate();
    } catch (error) {
      console.error('Error updating request status:', error);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-background-light p-6 rounded-xl border border-primary/20"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary-light" />
            <p className="text-white">{request.address}</p>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-primary-light" />
            <p className="text-gray-400">{new Date(request.collectionDate).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary-light" />
            <p className="text-gray-400">
              {request.collectionTime === 'morning' ? '7:00 AM' : '10:00 PM'}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColors[request.status]}`}>
          {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
        </span>
      </div>

      <div className="space-y-4">
        <div className="border-t border-primary/10 pt-4">
          <h4 className="text-sm font-medium text-white mb-2">Waste Details</h4>
          <p className="text-sm text-gray-400">
            Type: {request.wasteType}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {request.wasteItems.map((item) => (
              <span
                key={item}
                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs bg-primary/10 text-primary-light"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="border-t border-primary/10 pt-4">
          <p className="text-sm text-gray-400">
            Contact: {request.contactDetails.name} • {request.contactDetails.phone}
          </p>
        </div>

        {isProvider && request.status === 'pending' && (
          <div className="border-t border-primary/10 pt-4 flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleStatusUpdate('accepted')}
              className="flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Accept
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleStatusUpdate('cancelled')}
              className="flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Cancel
            </Button>
          </div>
        )}

        {isProvider && request.status === 'accepted' && (
          <div className="border-t border-primary/10 pt-4">
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleStatusUpdate('completed')}
              className="w-full flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Mark as Completed
            </Button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default RequestCard;