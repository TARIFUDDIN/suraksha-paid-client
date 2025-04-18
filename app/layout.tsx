import type { Metadata } from 'next'
import "@radix-ui/themes/styles.css";
import './globals.css'
import { Theme } from "@radix-ui/themes";


export const metadata: Metadata = {
  title: 'Surakhsa AI',
  description: 'Created by @webcrafters',
  generator: 'webcrafters',
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
   
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500&display=swap"
          />
        </head>
        <body className="font-poppins bg-background text-foreground">
          <Theme>
            {/* Navbar handles authentication, so no buttons here */}
            {children}
          </Theme>
        </body>
      </html>

  );
}
