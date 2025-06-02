import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Chat from '../pages/Chat';
import NewPassword from '../pages/NewPassword';
import ForgottenPassword from '../pages/ForgottenPassword';
//import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />¨
    <Route path="/forgotten-password" element={<ForgottenPassword />} />
    <Route path="/chat" element={<Chat />} />
    <Route path="/chat/:chatId" element={<Chat />} />
    <Route path="/new-password/:resetToken" element={<NewPassword />} />
  </Routes>
);

export default AppRoutes;