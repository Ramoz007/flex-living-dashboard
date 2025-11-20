"use client";

import { FC, Fragment, useEffect, useState } from "react";

import { PropertyHeader } from "./Header";
import { NotFound } from "@/views/NotFound";
import { IndexDatabaseStore, IndexDatabaseStoreKey, LocalPath } from "@/utilities/types/enum";
import { usePropertiesOne } from "@/hooks/property/useOne";
import LoadingCircularSection from "@/components/loaders/LoadingSections";
import { Separator } from "@/components/ui/separator";
import { PropertyGallery } from "./Gallery";
import { Label } from "@/components/ui/label";
import { Item, ItemGroup, ItemSeparator } from "@/components/ui/item";
import { Badge } from "@/components/ui/badge";
import { BadgeCheckIcon } from "lucide-react";
import { getIndexedDatabaseItem } from "@/utilities/helpers/storage";

interface PropertyViewProps {
  propertyId: string;
}

export const PropertyView: FC<PropertyViewProps> = ({ propertyId }) => {
  const decodedPropertyId = decodeURIComponent(propertyId);
  const { property, isLoading } = usePropertiesOne({ id: decodedPropertyId });

  // LOCAL STATE: private review IDs stored in IndexedDB
  const [isPrivateMap, setIsPrivateMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const load = async () => {
      try {
        const stored = await getIndexedDatabaseItem<Record<string, boolean>>(
          IndexDatabaseStore.FLEX_LIVING_DATA,
          IndexDatabaseStoreKey.PRIVATE_REVIEWS
        );
        setIsPrivateMap(stored ?? {});
      } catch (err) {
        console.error("Failed to load private reviews:", err);
        setIsPrivateMap({});
      }
    };

    load();
  }, []);

  if (isLoading) {
    return <LoadingCircularSection />;
  }

  if (!property) {
    return (
      <NotFound
        name="Property"
        parentPage={{
          label: "Go to Properties",
          href: LocalPath.PROPERTIES,
        }}
      />
    );
  }

  // FILTER → only reviews where map[id] !== true
  const publicReviews = (property.reviews ?? []).filter((r) => !isPrivateMap[String(r.id)]);

  return (
    <div className="w-full mx-auto flex-direction-col px-3 mb-5">
      <PropertyHeader property={property} />
      <Separator />
      <PropertyGallery />
      <div className="px-10">
        <div className="m-3">
          <Label className="text-[32px]">{property.listingName}</Label>
        </div>
        <Separator />
        <div className="flex w-full flex-col lg:flex-row gap-2 mt-3">
          <div className="flex flex-col justify-start w-full lg:w-3/5 border-1 rounded-md p-5">
            <Label className="text-[24px] mb-3">About this property</Label>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
            dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </div>

          <div className="flex flex-col items-center justify-start w-full lg:w-2/5 border-1 rounded-md">
            <div className="flex w-full flex-col gap-5">
              <ItemGroup>
                {publicReviews.map((review, index, arr) => (
                  <div key={review.id} className="px-5">
                    <Item className="gap-1 px-0 pb-1">
                      <p className="font-bold">Review:</p> "{review.publicReview}"
                    </Item>
                    <div className="flex pb-2 gap-2 flex-wrap mb-2">
                      {(review.categoryRatings ?? []).map((category) => (
                        <Badge
                          variant="secondary"
                          className="bg-gray-400 text-white"
                          key={category.category}
                        >
                          {category.category}: {category.rating}
                        </Badge>
                      ))}
                    </div>

                    {index !== arr.length - 1 && <ItemSeparator />}
                  </div>
                ))}

                {publicReviews.length === 0 && (
                  <Label className="p-4 text-center text-sm text-gray-500">
                    No public reviews available.
                  </Label>
                )}
              </ItemGroup>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
