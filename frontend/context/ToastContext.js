'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};

const ToastContainer = ({ toasts, onRemove }) => {
  if (!toasts.length) return null;
  return (
    <div style={{
      position: 'fixed',
      top: '90px',
      right: '20px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {toasts.map(toast => (
        <Toast key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  );
};

const COLORS = {
  success: { bg: '#d1fae5', border: '#10b981', text: '#065f46' },
  error:   { bg: '#fee2e2', border: '#ef4444', text: '#991b1b' },
  info:    { bg: '#dbeafe', border: '#3b82f6', text: '#1e40af' },
};

const ICONS = {
  success: '✓',
  error: '✕',
  info: 'ℹ',
};

const Toast = ({ toast, onRemove }) => {
  const c = COLORS[toast.type] || COLORS.info;
  return (
    <div onClick={() => onRemove(toast.id)} style={{
      background: c.bg,
      border: `1px solid ${c.border}`,
      color: c.text,
      padding: '12px 16px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      minWidth: '260px',
      maxWidth: '360px',
      cursor: 'pointer',
      fontWeight: '500',
      fontSize: '14px',
      animation: 'slideIn 0.3s ease',
    }}>
      <span style={{ fontSize: '18px', fontWeight: '700' }}>{ICONS[toast.type]}</span>
      {toast.message}
    </div>
  );
};