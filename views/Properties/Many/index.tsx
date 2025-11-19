"use client";

import { FC } from "react";

import { Separator } from "@/components/ui/separator";
import { PropertiesHeader } from "@/views/Properties/Many/Header";
import { PropertiesPageContent } from "@/views/Properties/Many/Content";

export const PropertiesView: FC = () => (
  <div className="px-3">
    <PropertiesHeader />
    <Separator />
    <PropertiesPageContent />
  </div>
);
