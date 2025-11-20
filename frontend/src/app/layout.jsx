// app/layout.js
import "./globals.css";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "盒条件系统专用PDA - 山东中烟项目 | 东集 AUTOID UM3",
  description: "高性能工业级PDA，适配山东中烟‘盒条件’系统，支持扫码、数据采集与实时通讯。",
  keywords: ["PDA", "盒条件系统", "山东中烟", "AUTOID UM3"],
  openGraph: {
    title: "盒条件系统专用PDA",
    description: "性能强大、兼容性优异的工业终端。",
    images: ["/images/um3-cover.jpg"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
