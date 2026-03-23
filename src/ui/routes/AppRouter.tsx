import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeApp from '@/ui/pages/HomeApp';
import ExceptionPage from '@pages/exception';
import PublicRoute from '@components/hoc/PublicRoute';

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
      
      {/* Placeholder for future private routes */}
      
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
