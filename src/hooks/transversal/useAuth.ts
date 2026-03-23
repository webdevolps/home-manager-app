import { useState } from 'react';

// Mock auth hook to be replaced later with real logic
export const useAuth = () => {
  const [isAuthenticated] = useState(false);
  const [isLoading] = useState(false);
  const [canQuote] = useState(false);

  return { isAuthenticated, isLoading, canQuote };
};
