"use client";

import { FC, useEffect } from "react";
import { useRouter } from "next/navigation";

import { LocalPath } from "@/utilities/types/enum";
import { LinearLoader } from "@/components/loaders/LinearLoader";

export const HomeView: FC = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace(LocalPath.DASHBOARD);
  }, []);
  return <LinearLoader />;
};
