import './globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import { ThemeProvider } from '../components/ui/theme-provider';

const inter = Inter({ subsets: ['latin'] });

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
      <body className={inter.className}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
