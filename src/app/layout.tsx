import { PropsWithChildren } from 'react'
import './globals.css'

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <body className="antialiased font-sans bg-slate-950 text-slate-100">{children}</body>
    </html>
  )
}
