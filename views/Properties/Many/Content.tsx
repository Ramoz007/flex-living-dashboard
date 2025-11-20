"use client";

import { FC } from "react";

import { usePropertiesMany } from "@/hooks/property/useMany";
import { PropertyDataGrid } from "@/views/Properties/Many/Table";

export const PropertiesPageContent: FC = () => {
  const { isLoading, properties } = usePropertiesMany();
  return (
    <div className="space-y-4">
      <PropertyDataGrid properties={properties} isLoading={isLoading} />
    </div>
  );
};
