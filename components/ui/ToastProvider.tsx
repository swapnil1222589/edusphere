'use client';
import { Toaster } from 'react-hot-toast';
export default function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: '#1a1a2e',
          color: '#f0f0ff',
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: '12px',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
        },
        success: { iconTheme: { primary: '#10b981', secondary: '#fff' } },
        error: { iconTheme: { primary: '#ef4444', secondary: '#fff' } },
      }}
    />
  );
}
