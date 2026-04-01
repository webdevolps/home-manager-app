import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomeApp from '@/ui/pages/HomeApp';
import ExceptionPage from '@pages/exception';
import PublicRoute from '@components/hoc/PublicRoute';
import PrivateRoute from '@components/hoc/PrivateRoute';

import DashboardLayout from '@components/templates/DashboardLayout/DashboardLayout';
import DashboardPage from '@pages/Dashboard/DashboardPage';
import EmployeesPage from '@pages/Employees/EmployeesPage';
import LegacyPlaceholder from '@pages/LegacyPlaceholder/LegacyPlaceholder';

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

      {/* Redirect /login to / to prevent 404 */}
      <Route path="/login" element={<Navigate to="/" replace />} />
      
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
        <Route path="management" element={<EmployeesPage />} />
        <Route path="legacy/*" element={<LegacyPlaceholder />} />
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
