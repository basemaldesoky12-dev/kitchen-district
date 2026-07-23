import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Tajawal } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const tajawal = Tajawal({
  variable: "--font-tajawal",
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kitchen District — Cloud Kitchen Infrastructure in Jeddah",
  description:
    "Fully equipped commercial kitchens for delivery food brands. Kitchen District provides the space, equipment, technology, and operations to launch and scale in Jeddah.",
  openGraph: {
    title: "Kitchen District",
    description:
      "Cloud kitchen infrastructure in Jeddah — fully equipped commercial kitchens for delivery food brands.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${jakarta.variable} ${tajawal.variable}`}
    >
      <head>
        {/* Material Symbols icon font. `display=block` keeps ligatures from
            flashing their text fallback before the font loads. */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font, @next/next/google-font-display */}
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=block"
        />
      </head>
      <body className="tile-surface">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
