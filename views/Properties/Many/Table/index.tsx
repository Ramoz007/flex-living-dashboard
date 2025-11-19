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
import { LinearLoader } from "@/components/loaders/LinearLoader";
import { NormalizedProperty } from "@/api/hostaway/reviews/types";
import { SectionLoader } from "@/components/loaders/SectionLoader";
import { DataTableNoData } from "@/views/Properties/Many/Table/NoData";

interface PropertyProps {
  isLoading?: boolean;
  properties: NormalizedProperty[];
}

export const PropertyDataGrid: FC<PropertyProps> = ({ properties, isLoading }) => {
  return (
    <div>
      {isLoading && <LinearLoader />}
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-100">
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {properties?.length > 0 &&
            !isLoading &&
            properties.map((property) => (
              <TableRow key={property.listingName}>
                <TableCell className="font-medium">
                  <Link href={`${LocalPath.PROPERTIES}/${property.listingName}`}>
                    {property.listingName}
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {isLoading && <SectionLoader minHeight="200px" />}
      {!properties?.length && !isLoading && <DataTableNoData message="No properties found" />}
    </div>
  );
};
