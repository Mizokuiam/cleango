import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import Container from '../components/ui/Container';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background-dark pt-24">
      <Container>
        <h1 className="text-3xl font-bold text-white">Welcome, {user?.email}</h1>
      </Container>
    </div>
  );
};

export default Dashboard;