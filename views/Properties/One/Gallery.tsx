import { FC } from "react";
import Image from "next/image";

export const PropertyGallery: FC = () => {
  return (
    <div className="mt-5 w-full mx-auto flex justify-center">
      <div>
        <Image
          src={"/static/images/property-gallery.jpg"}
          alt=""
          width={"400"}
          height={"400"}
          className="rounded-lg"
        />
      </div>
    </div>
  );
};
