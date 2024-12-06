import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Container from '../components/ui/Container';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  return (
    <Container className="py-12">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Welcome, {user?.email}</h1>
        {user?.role === 'resident' ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Resident Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard
                title="Schedule Pickup"
                description="Request a new waste collection"
              />
              <DashboardCard
                title="Active Requests"
                description="View your current pickup requests"
              />
              <DashboardCard
                title="Payment History"
                description="View your payment history"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Provider Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <DashboardCard
                title="Pending Requests"
                description="View pending collection requests"
              />
              <DashboardCard
                title="Route Planning"
                description="Optimize your collection routes"
              />
              <DashboardCard
                title="Analytics"
                description="View collection statistics"
              />
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

const DashboardCard: React.FC<{ title: string; description: string }> = ({
  title,
  description,
}) => (
  <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default Dashboard;