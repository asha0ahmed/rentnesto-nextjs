'use client';

import { AuthProvider } from '../context/AuthContext';
import { ToastProvider } from '../context/ToastContext';
import { useEffect } from 'react';

export default function Providers({ children }) {
  return (
    <AuthProvider>
      <ToastProvider> 
        {children}
       </ToastProvider>
    </AuthProvider>
  );
}