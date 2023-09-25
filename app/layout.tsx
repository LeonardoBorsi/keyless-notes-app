import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>Notes</title>
        <link rel="icon" href="/favicon.png" />
      </head>
      <body className={inter.className}>
        { children }
      </body>
    </html>
  )
}