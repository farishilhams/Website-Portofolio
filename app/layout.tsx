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
    default: "Rishy | Portofolio",
    template: "%s | Rishy Portofolio",
  },
  description: "Personal Portofolio of Farish Ilham Syahrani (Rishy). Web Developer & Machine Learning Enthusiast specializing in Next.js, Node.js, and modern web development.",
  keywords: ["Rishy", "Farish Ilham Syahrani", "Portofolio", "Web Developer", "Machine Learning", "Backend Developer", "Next.js", "React", "Node.js"],
  authors: [{ name: "Farish Ilham Syahrani" }],
  creator: "Farish Ilham Syahrani",
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "/",
    title: "Rishy | Portofolio",
    description: "Personal Portofolio of Farish Ilham Syahrani (Rishy). Web Developer & Machine Learning Enthusiast.",
    siteName: "Rishy Portofolio",
    images: [
      {
        url: "/images/profile.jpg",
        width: 1200,
        height: 630,
        alt: "Rishy Portofolio - Farish Ilham Syahrani",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishy | Portofolio",
    description: "Personal Portofolio of Farish Ilham Syahrani (Rishy). Web Developer & Machine Learning Enthusiast.",
    images: ["/images/profile.jpg"],
    creator: "@farishsyahrani",
  },
  icons: {
    icon: "/images/profile.jpg",
    shortcut: "/images/profile.jpg",
    apple: "/images/profile.jpg",
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

