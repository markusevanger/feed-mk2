import React from 'react'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'
import Link from 'next/link'
import { Github } from 'lucide-react'
export const metadata = {
  description: 'feed.markusevanger.no',
  title: 'Feed 2.0',
}

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          <div className="flex justify-center items-center gap-2 pb-16">
            <div className="flex justify-center items-center bg-muted py-1 px-2 rounded-full text-sm font-mono">
              <p>
                made by{' '}
                <a href="https://markusevanger.no" className="underline">
                  markusevanger.no
                </a>
              </p>
            </div>
            <div className="flex justify-center items-center bg-muted py-1 px-2 rounded-full text-sm font-mono">
              <p>Feed 2.0</p>
            </div>

            <div className="flex justify-center items-center bg-muted py-1 px-2 rounded-full text-sm font-mono">
              <Link href="https://github.com/markusevanger/feed-mk2" className="underline">
                <Github className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
