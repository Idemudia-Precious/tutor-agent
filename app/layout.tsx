import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Bricolage_Grotesque } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Head from "next/head";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TutorAgent",
  description: "Real-time AI Teaching Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ variables: { colorPrimary: "#1F1F23" } }}>
      <html lang="en">
        <body className={`${bricolage.variable} antialiased`}>
          <Head>
            <link rel="icon" href="/images/logo2.svg" type="image/svg+xml" />
          </Head>
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
