import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Chatbot from "@/components/Chatbot";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Hạnh Nguyễn - Chuyên gia Bảo hiểm",
  description: "Giải pháp bảo hiểm toàn diện cho gia đình Việt",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className={inter.className}>
        <Header />
        {children}
        <Chatbot />
      </body>
    </html>
  );
}