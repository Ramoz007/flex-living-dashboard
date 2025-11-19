"use client";

import React, { forwardRef, HTMLAttributes } from "react";

import { spinnerSizeType } from "@/utilities/types/utilities";
import { spinnerSizeMap } from "@/utilities/constants/general";

export interface SpinnerProps extends HTMLAttributes<HTMLSpanElement> {
  size?: spinnerSizeType;
  loading?: boolean;
  children?: React.ReactNode;
}

export const Spinner = forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ size = "2", loading = true, children, className = "", ...props }, ref) => {
    if (!loading) return <>{children}</>;
    const sizeInPixels =
      typeof size === "number" ? size : spinnerSizeMap[size as keyof typeof spinnerSizeMap];
    const spinner = (
      <span
        ref={ref}
        className={`relative inline-block opacity-65 ${className}`}
        style={{ width: `${sizeInPixels}px`, height: `${sizeInPixels}px` }}
        {...props}
      >
        {[0, 45, 90, 135, 180, 225, 270, 315].map((rotation, index) => (
          <span
            key={rotation}
            className="absolute top-0 left-[calc(50%-6.25%)] w-[12.5%] h-full"
            style={{
              transform: `rotate(${rotation}deg)`,
              animation: "spinner-leaf-fade 800ms linear infinite",
              animationDelay: `calc(-${8 - index} / 8 * 800ms)`,
            }}
          >
            <span className="block w-full h-[30%] rounded-sm bg-current"></span>
          </span>
        ))}
      </span>
    );
    if (children === undefined) return spinner;
    return (
      <span className="relative flex items-center justify-center">
        {/* Hidden children */}
        <span aria-hidden="true" className="contents invisible">
          {children}
        </span>
        {/* Positioned spinner */}
        <span className="absolute inset-0 flex items-center justify-center">{spinner}</span>
      </span>
    );
  }
);
