import "@/styles/globals.css";
import { Link } from "@heroui/link";
// import { GoogleAnalytics } from '@next/third-parties/google';
import clsx from "clsx";
import { Metadata, Viewport } from "next";
import { Providers } from "./providers";

import { Navbar } from "@/components/navbar";
import { Sonner } from "@/components/Sonner";
import { fontSans } from "@/config/fonts";
import { siteConfig } from "@/config/site";
import { NextIntlClientProvider } from "next-intl";
import { getLocale } from "next-intl/server";
import localFont from "next/font/local";
// import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://diu-cgpa.shovon.me"),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: siteConfig.openGraph,
  twitter: siteConfig.twitter,
  alternates: siteConfig.alternates,
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};
const fontBangla = localFont({
  src: [
    {
      path: "../assets/hind_siliguri_regular.woff",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/hind_siliguri_medium.woff",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/hind_siliguri_semi_bold.woff",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/hind_siliguri_bold.woff",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-bangla",
  display: "swap",
  preload: true,
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  return (
    <html suppressHydrationWarning lang="bn">
      <head />
      <body
        className={clsx(
          "bg-background antialiased",
          fontSans.variable,
          fontBangla.variable,
          locale === "en" ? "font-sans" : "font-bangla",
          "text-slate-900 dark:text-slate-100",
          "min-h-screen transition-colors duration-300 ease-in-out",
        )}
      >
        <NextIntlClientProvider>
          <Providers>
            <div className="relative flex flex-col min-h-svh">
              <Navbar />
              <main className="container mx-auto max-w-7xl pt-16 px-6 flex-grow">{children}</main>
              <footer className="w-full flex items-center justify-center py-3">
                <p />
                <Link isExternal className="flex items-center gap-1 text-current" href="https://shovon.me" title="shovon.me homepage">
                  <p className="text-default-600">© [.shovon] {new Date().getFullYear()}</p>
                </Link>
              </footer>
            </div>
            <Sonner />
          </Providers>
        </NextIntlClientProvider>
      </body>
      {/* <Script src="UMAMI_URL" data-website-id="UMAMI_ID" />
      <Script id="ms_clarity" strategy="afterInteractive">
        {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
    })(window, document, "clarity", "script", "STRING_ID");`}
      </Script>
      <GoogleAnalytics gaId="GOOGLE_TAG" /> */}
    </html>
  );
}
