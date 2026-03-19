'use client';

import React, { useContext, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children, ownerOnly = false, tenantOnly = false }) => {
  const { user, loading, isAuthenticated } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (ownerOnly && user?.accountType !== 'owner') {
        router.push('/');
      } else if (tenantOnly && user?.accountType !== 'tenant') {
        router.push('/');
      }
    }
  }, [loading, isAuthenticated, user, router, ownerOnly, tenantOnly]);

  if (loading) {
    return (
      <div style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div className="spinner"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  if (ownerOnly && user?.accountType !== 'owner') {
    return null;
  }

  if (tenantOnly && user?.accountType !== 'tenant') {
    return null;
  }

  return children;
};

export default ProtectedRoute;