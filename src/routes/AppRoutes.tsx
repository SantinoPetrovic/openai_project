import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
  </Routes>
);

export default AppRoutes;