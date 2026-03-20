'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function AuthProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = () => {
      const token = localStorage.getItem('access_token');
      
      // Public routes that don't need authentication
      const publicRoutes = ['/login', '/signup', '/'];
      
      if (!token && !publicRoutes.includes(pathname)) {
        // No token and trying to access protected route
        router.push('/login');
        setIsAuthenticated(false);
      } else if (token) {
        // Token exists, user is authenticated
        setIsAuthenticated(true);
        
        // If authenticated user tries to access login/signup, redirect to dashboard
        if (publicRoutes.includes(pathname)) {
          router.push('/dashboard');
        }
      } else {
        // On public route without token (allowed)
        setIsAuthenticated(false);
      }
      
      setIsLoading(false);
    };

    checkAuth();
  }, [pathname, router]);

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}