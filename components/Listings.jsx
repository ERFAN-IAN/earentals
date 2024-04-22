"use client";
import ListCard from "./ListCard";
import { fetchUserProperties } from "@/utils/requests";
import { useQuery } from "@tanstack/react-query";
const Listings = () => {
  const { data, isLoading } = useQuery(fetchUserProperties());
  if (isLoading) {
    return (
      <div className="flex w-full pt-40 justify-center items-center">
        <span className="loading loading-infinity loading-lg mb-52"></span>
      </div>
    );
  }
  const magicNumbers = [0, 3, 4, 7, 8, 11, 12, 15, 16, 19, 20];
  return (
    <div>
      <div className="hidden md:grid md:grid-cols-2 gap-6 mt-2 w-full">
        {data?.map((item, index) => {
          return (
            <ListCard
              property={item}
              key={index}
              tclass={
                magicNumbers.includes(index) ? `bg-[#60a5fa] text-base-100` : ``
              }
            />
          );
        })}
      </div>
      <div className="grid md:hidden md:grid-cols-2 gap-6 mt-2 w-full">
        {data?.map((item, index) => {
          return (
            <ListCard
              property={item}
              key={index}
              tclass={index % 2 === 0 ? `bg-[#60a5fa] text-base-100` : ``}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Listings;
