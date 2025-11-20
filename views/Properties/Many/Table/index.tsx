"use client";

import { FC } from "react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { LocalPath } from "@/utilities/types/enum";
import { NormalizedProperty } from "@/api/hostaway/reviews/types";
import { SectionLoader } from "@/components/loaders/SectionLoader";
import { DataTableNoData } from "@/views/Properties/Many/Table/NoData";

interface PropertyProps {
  isLoading?: boolean;
  properties?: NormalizedProperty[] | null;
}

export const PropertyDataGrid: FC<PropertyProps> = ({ properties, isLoading }) => {
  const hasData = properties && properties.length > 0;

  return (
    <div className="w-full rounded-md mt-4">
      <div className="max-h-[500px] overflow-y-auto border rounded-md">
        <Table>
          <TableHeader className="bg-gray-100 sticky top-0 z-10">
            <TableRow>
              <TableHead className="font-semibold text-[15px]">Property Name</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {hasData &&
              properties!.map((property) => (
                <TableRow key={property.listingName} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    <Link
                      href={`${LocalPath.PROPERTIES}/${property.listingName}`}
                      className="hover:underline"
                    >
                      {property.listingName}
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            {!hasData && !isLoading && (
              <TableRow>
                <TableCell colSpan={2} className="text-center py-8">
                  <DataTableNoData message="No properties found" />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {isLoading && <SectionLoader minHeight="200px" />}
    </div>
  );
};
