import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './reset.css';
import './spacing.css';
import { spacing } from './spacing.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Example Page',
  description: 'A collection of @butter-cream examples',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} ${spacing.spacingFontSizeClasses.body}`}
      >
        <header className={spacing.spacingFontSizeClasses.base}>Example</header>
        {children}
        <footer className={spacing.spacingFontSizeClasses.base}>© 2025</footer>
      </body>
    </html>
  );
}
