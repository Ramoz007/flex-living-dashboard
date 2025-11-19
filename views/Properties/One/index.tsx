"use client";

import { FC } from "react";
import { usePathname } from "next/navigation";

import LoadingCircularSection from "@/components/loaders/LoadingSections";
// import { usePropertiesOne } from "@/hooks/property/useOne";

interface PropertyViewProps {
  propertyId: string;
}

export const PropertyView: FC<PropertyViewProps> = ({ propertyId }) => {
  const pathname = usePathname();
  // const { property, isLoading } = usePropertiesOne({ id: propertyId });
  if (true) {
    return <LoadingCircularSection />;
  }
};
