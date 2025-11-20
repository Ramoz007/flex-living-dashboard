import { NormalizedProperty } from "@/api/hostaway/reviews/types";
import { Label } from "@/components/ui/label";
import { FC } from "react";

interface PropertyCountProps {
  properties: NormalizedProperty[];
}

export const PropertyCount: FC<PropertyCountProps> = ({ properties }) => {
  const total = properties?.length ?? 0;
  return (
    <div className="flex flex-col items-center border-1 rounded-md p-3 w-[250px] h-[180px]">
      <Label className="text-[16px]">Total Properties</Label>
      <span className="text-[64px] font-bold mt-3">{total}</span>
    </div>
  );
};
