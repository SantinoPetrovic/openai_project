import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Chat from '../pages/Chat';
//import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/chat/:chatId" element={<Chat />} />
  </Routes>
);

export default AppRoutes;