import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/hooks/useAuth';
import ToastProvider from '@/components/ui/ToastProvider';
import ThemeInit from '@/components/ui/ThemeInit';

export const metadata: Metadata = {
  title: 'EduSphere – Smart College Management Platform',
  description: 'EduSphere is an all-in-one digital operating system for colleges. Manage academics, attendance, placements, and campus life from a single platform.',
  keywords: ['college management', 'student portal', 'attendance', 'placement', 'edtech'],
  authors: [{ name: 'EduSphere Team' }],
  openGraph: {
    title: 'EduSphere – Smart College Management Platform',
    description: 'The modern way to manage college life.',
    type: 'website',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeInit />
        <AuthProvider>
          <ToastProvider />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
