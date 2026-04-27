import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "इंटरनेट की आवाज़ — सच की आवाज़, हर ख़बर आपके साथ | Internet Ki Awaaz",
  description: "इंटरनेट की आवाज़ — लखनऊ, गोंडा और उत्तर प्रदेश की ताज़ा खबरें। राजनीति, अपराध, खेल, मनोरंजन, स्वास्थ्य और शिक्षा की खबरें पढ़ें।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hi" dir="ltr">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" />
      </head>
      <body className={inter.className}>
        <div id="fb-root"></div>
        <script async defer crossOrigin="anonymous" src="https://connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v25.0&appId=APP_ID"></script>
        
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
