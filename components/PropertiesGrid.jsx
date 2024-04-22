"use client";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import PropertiesCardGrid from "./PropertiesCardGrid";
const PropertiesGrid = () => {
  const searchParams = Object.fromEntries(useSearchParams());
  const queryString = `?search=${
    searchParams.search ? searchParams.search : ""
  }&type=${searchParams.type ? searchParams.type : ""}`;
  const { data: properties, isLoading } = useQuery({
    queryKey: [`${searchParams.search || ""}`, `${searchParams.type || "All"}`],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/search/${queryString}`
      );
      const rtj = await response.json();
      return rtj;
    },
  });
  if (isLoading) {
    return (
      <div className="flex w-full justify-center items-center">
        <span className="loading loading-infinity loading-lg mt-52"></span>
      </div>
    );
  }
  if (properties?.message || properties?.length === 0) {
    return <h1>no result</h1>;
  }
  return (
    <div className="flex justify-center">
      <div
        className="grid sm:grid-cols-2 lg:grid-cols-3
    gap-4 w-full"
      >
        {properties?.map((item) => {
          return (
            <PropertiesCardGrid
              key={item._id}
              title={item.name}
              image={item?.images?.[0]?.secure_url}
              type={item.type}
              location={item.location}
              beds={item.beds}
              baths={item.baths}
              square_feet={item.square_feet}
              rates={item.rates}
              id={item._id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PropertiesGrid;
