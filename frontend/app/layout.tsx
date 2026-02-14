/**
 * Root layout with metadata and global structure
 */

import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import '@/styles/globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Todo App - Manage Your Tasks',
    template: '%s | Todo App',
  },
  description:
    'A modern, secure todo application with user authentication and task management',
  keywords: ['todo', 'task management', 'productivity', 'tasks', 'organizer'],
  authors: [{ name: 'Todo App Team' }],
  creator: 'Todo App Team',
  publisher: 'Todo App',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://todo-app.example.com',
    title: 'Todo App - Manage Your Tasks',
    description:
      'A modern, secure todo application with user authentication and task management',
    siteName: 'Todo App',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Todo App - Manage Your Tasks',
    description:
      'A modern, secure todo application with user authentication and task management',
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#2563eb' },
    { media: '(prefers-color-scheme: dark)', color: '#1e40af' },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
