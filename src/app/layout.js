"use client"

import Link from "next/link"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <body>
        <header>
          <nav>
            <ul className="flex justify-center gap-16">
              
            </ul>
          </nav>
        </header>
        {children}
      </body>
    </html>
  )
}
