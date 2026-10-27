import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "../styles/globals.css"
import PageLoader from "@/components/PageLoader"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL || "https://rishy.my.id"),
  title: {
    default: "Rishy | Portfolio",
    template: "%s | Rishy Portfolio",
  },
  description: "Personal Portfolio of Farish Ilham Syahrani (Rishy). Full Stack Developer & Machine Learning Enthusiast specializing in Next.js, Node.js, and modern web development.",
  keywords: ["Rishy", "Farish Ilham Syahrani", "Portfolio", "Full Stack Developer", "Machine Learning", "Backend Developer", "Next.js", "React", "Node.js"],
  authors: [{ name: "Farish Ilham Syahrani" }],
  creator: "Farish Ilham Syahrani",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "Rishy | Portfolio",
    description: "Personal Portfolio of Farish Ilham Syahrani (Rishy). Full Stack Developer & Machine Learning Enthusiast.",
    siteName: "Rishy Portfolio",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Rishy Portfolio - Farish Ilham Syahrani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishy | Portfolio",
    description: "Personal Portfolio of Farish Ilham Syahrani (Rishy). Full Stack Developer & Machine Learning Enthusiast.",
    images: ["/images/profile.jpg"],
    creator: "@farishsyahrani",
  },
  icons: {
    icon: "/icons/icon.svg",
    shortcut: "/favicon.ico",
    apple: "/icons/icon.svg",
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "ZbLhiilDbtLDyIx5eH6Jeoe1jPkXNKId-LhXG1HhLWA",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>
        <PageLoader />
        {children}
      </body>
    </html>
  )
}

