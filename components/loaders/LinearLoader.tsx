"use client";

import { FC } from "react";

import { Color } from "@/utilities/types/utilities";
import { colorClasses } from "@/utilities/constants/general";
import { mergeTailwind } from "@/utilities/helpers/mergeTailwind";

interface LinearLoaderProps {
  className?: string;
  color?: Color;
}

export const LinearLoader: FC<LinearLoaderProps> = ({ className, color = "primary" }) => {
  const colors = colorClasses[color];

  return (
    <div className={mergeTailwind("fixed top-0 left-0 z-[1301] w-full m-0 p-0", className)}>
      <div className={mergeTailwind("h-1 w-full relative overflow-hidden", colors.background)}>
        <span
          className={mergeTailwind(
            "absolute top-0 left-0 right-0 bottom-0 w-auto origin-left transition-transform duration-100 ease-linear",
            colors.bar,
            "animate-linear-loader-one"
          )}
        />
        <span
          className={mergeTailwind(
            "absolute top-0 left-0 right-0 bottom-0 w-auto origin-left transition-transform duration-100 ease-linear",
            colors.bar,
            "animate-linear-loader-two"
          )}
        />
      </div>
    </div>
  );
};
