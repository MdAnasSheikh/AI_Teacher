import './globals.css';
import type { Metadata } from 'next';
import { ThemeProvider } from '../components/ui/theme-provider';
import { AuthProvider } from '../contexts/AuthContext';

export const metadata: Metadata = {
  title: 'Neural Learning Universe',
  description: 'Your futuristic AI-powered study mentor — Next-gen adaptive learning, chat, PDF understanding, quizzes, and realtime mentor guidance.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
