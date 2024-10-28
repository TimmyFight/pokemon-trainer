import type { Metadata } from "next";
import localFont from "next/font/local";

const ibmVga = localFont({
  src: "./fonts/ibm_vga.woff",
  variable: "--font-ibm-vga",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Pokemon Tariners",
  description: "The registration form for new Pokemon Trainers.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ibmVga.variable}>{children}</body>
    </html>
  );
}
