import { FC } from "react";

import { PropertyView } from "@/views/Properties/One";

type Params = Promise<{ propertyId: string }>;

interface PropertyPageProps {
  params: Params;
}

const PropertiesPage: FC<PropertyPageProps> = async (props) => {
  const params = await props.params;

  return <PropertyView propertyId={params.propertyId} />;
};

export default PropertiesPage;
