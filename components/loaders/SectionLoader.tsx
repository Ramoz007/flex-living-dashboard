"use client";

import { FC } from "react";

import { mergeTailwind } from "@/utilities/helpers/mergeTailwind";
import { Spinner, SpinnerProps } from "@/components/loaders/Spinner";

interface SectionLoaderProps {
  minHeight?: string;
  className?: string;
  spinnerProps?: Omit<SpinnerProps, "loading" | "children">;
  message?: string;
}

export const SectionLoader: FC<SectionLoaderProps> = ({
  minHeight = "calc(100vh - 4rem)", // Default minus header height
  className,
  spinnerProps = {},
  message = "Loading...",
}) => (
  <div
    className={mergeTailwind("flex flex-col items-center justify-center w-full", className)}
    style={{ minHeight }}
  >
    <Spinner size="3" color="primary" {...spinnerProps} />
    {message && <p className="mt-4 text-sm text-muted-foreground animate-pulse">{message}</p>}
  </div>
);
