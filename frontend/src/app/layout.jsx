import "./globals.css";
import Navbar from "@/components/common/Navbar";

export const metadata = {
  title: "电商系统",
  description: "基于 Next.js 的电商项目",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-gray-50 text-gray-800">
        <Navbar />
        <main className="container mx-auto p-6">{children}</main>
      </body>
    </html>
  );
}
