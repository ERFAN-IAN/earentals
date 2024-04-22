"use client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { fetchSingleProperty } from "@/utils/requests";
import PropertyHeaderImage from "@/components/PropertyHeaderImage";
import DescriptionAndDetails from "@/components/DescriptionAndDetails";
import Amenities from "@/components/Amenities";
import PropertyDetailAddress from "@/components/PropertyDetailAddress";
import ShareAndBookmark from "@/components/ShareAndBookmark";
import ContactForm from "@/components/ContactForm";
import Loading from "./loading";
const page = () => {
  const { id } = useParams();
  const { data: property, isLoading } = useQuery(fetchSingleProperty(id));
  if (isLoading) {
    return <Loading />;
  }
  if (!property) {
    return <h1>This listing doesn't exist!</h1>;
  }
  return (
    <div>
      <PropertyHeaderImage images={property?.[0]?.images} />
      <div className="grid grid-cols-10 gap-x-4 mt-8">
        <div className="flex flex-col gap-y-8 col-span-10 lg:col-span-7">
          <PropertyDetailAddress property={property?.[0]} />
          <DescriptionAndDetails property={property?.[0]} />
          <Amenities property={property?.[0]} />
        </div>
        <div className=" col-span-10 lg:col-span-3">
          <ShareAndBookmark
            title={property?.[0]?.name}
            id={property?.[0]?._id}
          />

          <ContactForm />
        </div>
      </div>
    </div>
  );
};

export default page;
