import "@/styles/globals.css";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { Metadata, Viewport } from "next";

import { Providers } from "./providers";

import { Navbar } from "@/components/navbar";
import { Sonner } from "@/components/Sonner";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body className={clsx(" bg-background font-sans antialiased", fontSans.variable)}>
        <Providers>
          <div className="relative flex flex-col min-h-svh">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">{children}</main>
            <footer className="w-full flex items-center justify-center py-3">
              <p />
              <Link isExternal className="flex items-center gap-1 text-current" href="https://shovon.me" title="shovon.me homepage">
                <p className="text-default-600">© [.shovon] 2024</p>
              </Link>
            </footer>
          </div>
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
