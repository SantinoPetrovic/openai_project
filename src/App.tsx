import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { authService } from './services/AuthService';
import Layout from './components/Layout';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Layout>
        <AppRoutes />
      </Layout>
    </BrowserRouter>
  );
};

export default App;