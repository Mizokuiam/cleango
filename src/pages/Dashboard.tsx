import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import Container from '../components/ui/Container';
import Button from '../components/ui/Button';
import CollectionRequestForm from '../components/collection/CollectionRequestForm';
import RequestCard from '../components/collection/RequestCard';
import type { CollectionRequest } from '../lib/types';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requests, setRequests] = useState<CollectionRequest[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    try {
      const { data, error } = await supabase
        .from('collection_requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setRequests(data || []);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const handleRequestSuccess = () => {
    setShowRequestForm(false);
    fetchRequests();
  };

  return (
    <div className="min-h-screen bg-background-dark pt-24">
      <Container>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          {user?.role === 'resident' && (
            <Button
              variant="primary"
              onClick={() => setShowRequestForm(true)}
              className="flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Request
            </Button>
          )}
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : requests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                onStatusUpdate={fetchRequests}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-400">No collection requests found.</p>
          </div>
        )}

        {showRequestForm && (
          <CollectionRequestForm
            onSuccess={handleRequestSuccess}
            onClose={() => setShowRequestForm(false)}
          />
        )}
      </Container>
    </div>
  );
};

export default Dashboard;