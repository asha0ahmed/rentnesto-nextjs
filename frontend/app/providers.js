'use client';

import { AuthProvider } from '../context/AuthContext';
import { useEffect } from 'react';

export default function Providers({ children }) {
  useEffect(() => {

    const ping = () => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/`)
        .then(() => console.log('Server is awake'))
        .catch(() => console.log('Ping failed'));
    };

    ping(); // wake server immediately when someone visits
    
    // keep pinging every 14 minutes
    const interval = setInterval(ping, 14 * 60 * 1000);
    
    // cleanup when page closes
    return () => clearInterval(interval);

  }, []);

  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}