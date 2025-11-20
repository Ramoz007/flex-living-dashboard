"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { NormalizedProperty } from "@/api/hostaway/reviews/types";
import { getIndexedDatabaseItem, setIndexedDatabaseItem } from "@/utilities/helpers/storage";
import { IndexDatabaseStore, IndexDatabaseStoreKey } from "@/utilities/types/enum";

interface ReviewTableProps {
  properties: NormalizedProperty[];
}

export const ReviewTable: FC<ReviewTableProps> = ({ properties }) => {
  // Flatten reviews + attach property name
  const allReviews = useMemo(() => {
    return properties.flatMap((property) =>
      (property.reviews || []).map((review) => ({
        ...review,
        listingName: property.listingName,
      }))
    );
  }, [properties]);

  // Private state map: { [reviewId]: boolean }
  const [privateState, setPrivateState] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const loadData = async () => {
      const data = await getIndexedDatabaseItem<Record<number, boolean>>(
        IndexDatabaseStore.FLEX_LIVING_DATA,
        IndexDatabaseStoreKey.PRIVATE_REVIEWS
      );

      if (data) {
        setPrivateState(data);
      }
    };

    loadData();
  }, []);

  // Save to IndexedDB whenever privateState changes
  const persistState = async (updatedState: Record<number, boolean>) => {
    await setIndexedDatabaseItem(
      IndexDatabaseStore.FLEX_LIVING_DATA,
      IndexDatabaseStoreKey.PRIVATE_REVIEWS,
      updatedState
    );
  };

  const handleToggle = (reviewId: number) => {
    setPrivateState((prev) => {
      const updated = { ...prev, [reviewId]: !prev[reviewId] };
      persistState(updated); // Persist to IndexedDB
      return updated;
    });
  };

  return (
    <div className="w-full border rounded-md p-4">
      <Label className="text-[18px] font-semibold">Review Table</Label>
      <div className="mt-4 max-h-[500px] overflow-y-auto border rounded-md">
        <Table>
          <TableHeader className="bg-gray-100">
            <TableRow>
              <TableHead>Property</TableHead>
              <TableHead>Review</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Private</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {allReviews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-sm text-gray-500">
                  No reviews found.
                </TableCell>
              </TableRow>
            ) : (
              allReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell>{review.listingName}</TableCell>
                  <TableCell className="max-w-[250px] truncate">{review.publicReview}</TableCell>
                  <TableCell>{review.status}</TableCell>
                  <TableCell>{new Date(review.submittedAt).toLocaleDateString("en-GB")}</TableCell>
                  <TableCell>
                    <Switch
                      checked={privateState[review.id] || false}
                      onCheckedChange={() => handleToggle(review.id)}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
