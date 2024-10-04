import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import { PrivyWagmiProvider } from "@/context/privyWagmiContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fluid.loan",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <PrivyWagmiProvider>
          {children}
        </PrivyWagmiProvider>
      </body>
    </html>
  );
}
