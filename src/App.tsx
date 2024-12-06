import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Features from './pages/Features';
import Pricing from './pages/Pricing';
import { ROUTES } from './lib/constants';

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path={ROUTES.HOME} element={<Home />} />
            <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route path={ROUTES.SIGNUP} element={<Signup />} />
            <Route path={ROUTES.FEATURES} element={<Features />} />
            <Route path={ROUTES.PRICING} element={<Pricing />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </Router>
  );
};

export default App;