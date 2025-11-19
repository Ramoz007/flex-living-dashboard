import "@/styles/globals.css";

import { FC, ReactNode } from "react";

import { MainLayout } from "@/components/layouts/main";

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: FC<RootLayoutProps> = ({ children }) => (
  <html lang="en">
    <body suppressHydrationWarning>
      <MainLayout>{children}</MainLayout>
    </body>
  </html>
);

export default RootLayout;
