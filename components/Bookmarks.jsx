"use client";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { queryClient } from "./ReactQuery";
import { Gallery, Item } from "react-photoswipe-gallery";
import BookmarkCard from "./BookmarkCard";
import { useGlobalContext } from "@/context/context";
import { useState } from "react";
// import ListCard from "./ListCard";
const Bookmarks = () => {
  const { setIsDeleteModalOpen, setDeleteID } = useGlobalContext();

  const { data: property, isLoading } = useQuery({
    queryKey: ["bookmarkedList"],
    queryFn: async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMAIN}/bookmark`
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
  return (
    <div>
      <h2 className="font-bold text-2xl mt-2 mb-4">Your Bookmarks: </h2>
      <div className="grid md:grid-cols-2 gap-y-6 gap-x-6 mt-2 w-full">
        {property?.map((item, index) => {
          return <BookmarkCard item={item} key={index} index={index} />;
        })}
      </div>
    </div>
  );
};

export default Bookmarks;
