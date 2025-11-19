"use client";

import { FC } from "react";

import { Spinner } from "@/components/loaders/Spinner";

interface LoadingCircularSectionProps {
  minHeight?: string;
}

const LoadingCircularSection: FC<LoadingCircularSectionProps> = ({ minHeight = "100vh" }) => (
  <div style={{ minHeight }} className="flex flex-col items-center justify-center w-full">
    <Spinner size="3" />
  </div>
);

export default LoadingCircularSection;
