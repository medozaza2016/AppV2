import React from 'react';
    import ReactDOM from 'react-dom/client';
    import { BrowserRouter as Router, Route, Routes, Link, Navigate } from 'react-router-dom';
    import './index.css';
    import Dashboard from './components/Dashboard';
    import Inventory from './components/Inventory';
    import Settings from './components/Settings';
    import Login from './components/Login';
    import Register from './components/Register';
    import { SupabaseProvider } from './contexts/SupabaseContext';
    import ProtectedRoute from './components/ProtectedRoute';
    import Transactions from './components/Transactions'; // Import Transactions

    ReactDOM.createRoot(document.getElementById('root')).render(
      <React.StrictMode>
        <Router>
          <SupabaseProvider>
            <Routes>
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/inventory" element={<ProtectedRoute><Inventory /></ProtectedRoute>} />
              <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            </Routes>
          </SupabaseProvider>
        </Router>
      </React.StrictMode>
    );
