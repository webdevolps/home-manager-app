import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeApp from '@/ui/pages/HomeApp';
import ExceptionPage from '@pages/exception';
import PublicRoute from '@components/hoc/PublicRoute';
import PrivateRoute from '@components/hoc/PrivateRoute';

import DashboardLayout from '@components/templates/DashboardLayout/DashboardLayout';
import DashboardPage from '@pages/Dashboard/DashboardPage';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <PublicRoute>
            <HomeApp />
          </PublicRoute>
        } 
      />
      
      {/* Rutas Privadas del Dashboard */}
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<DashboardPage />} />
        {/* Placeholder for Management and Legacy routes */}
      </Route>

      {/* Excepciones (Not Found) */}
      <Route path="*" element={<ExceptionPage />} />
    </Routes>
  );
};

const AppRouter = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default AppRouter;
