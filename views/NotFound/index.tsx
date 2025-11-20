"use client";

import { FC } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface NotFoundProps {
  name?: string;
  parentPage?: {
    label: string;
    href: string;
  };
}

export const NotFound: FC<NotFoundProps> = ({ name, parentPage }) => (
  <div className="not-found flex flex-col items-center justify-center gap-4 min-h-full h-full w-full text-center">
    {/* Main 404 Text */}
    <div className="text-6xl font-bold text-black">404</div>
    <div className="text-xl font-semibold text-slate-600">Not Found</div>
    <div className="text-sm font-medium text-slate-600">
      Oops... We couldn't find {name ? `this ${name}` : "what you're looking for"}.
    </div>

    <div className="mt-6 flex items-center gap-4">
      {parentPage && (
        <Button asChild>
          <Link href={parentPage.href}>{parentPage.label}</Link>
        </Button>
      )}
      <Button variant="outline" asChild>
        <Link href="/">Go to Home</Link>
      </Button>
    </div>
  </div>
);
