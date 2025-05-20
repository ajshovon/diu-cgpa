export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "DIU CGPA Calculator",
  description: "Calculate your CGPA with ease.",
  keywords: ["CGPA", "DIU", "Calculator", "University", "Portal", "SGPA", "Result", "Calculator"],
  author: "Shovon",
  url: "https://diu-cgpa.shovon.me",
  image: "/og-image.png",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://diu-cgpa.shovon.me",
    title: "DIU CGPA  Calculator",
    description: "Calculate your CGPA with ease.",
    images: [
      {
        url: 'https://diu-cgpa.shovon.me/og-image.png',
        width: 1200,
        height: 630,
        alt: 'diu-cgpa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "DIU CGPA  Calculator",
    description: "Calculate your CGPA with ease.",
    images: [
      {
        url: 'https://diu-cgpa.shovon.me/og-image.png',
        width: 1200,
        height: 630,
        alt: 'diu-cgpa',
      },
    ],
  },
  alternates: {
    canonical: 'https://diu-cgpa.shovon.me',
  },
};



