import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { queryClient } from "./ReactQuery";
import { Gallery, Item } from "react-photoswipe-gallery";
import { useGlobalContext } from "@/context/context";
import { useState } from "react";
import { toast } from "react-toastify";
const BookmarkCard = ({ item, index }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleDeleteBookmars = async (id) => {
    setIsSubmitting(true);
    await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties/${id}`, {
      method: "PATCH",
      cache: "no-store",
    });
    setIsSubmitting(false);
    queryClient.invalidateQueries({ queryKey: ["bookmarkedList"] });
    toast.success("Bookmark Removed");
  };
  const magicNumbers = [0, 3, 4, 7, 8, 11, 12, 15, 16, 19, 20];
  return (
    <div>
      <article
        className={`flex md:hidden relative rounded-xl shadow-xl px-4 py-6 flex-col justify-between gap-y-2 h-full ${
          index % 2 === 0 ? `bg-slate-400 text-black` : ``
        }`}
      >
        <button
          onClick={() => {
            handleDeleteBookmars(item._id);
          }}
          className=" bg-red-600 rounded-lg py-2 px-4 hover:bg-red-700 absolute right-4 text-white disabled:bg-slate-300 disabled:text-black duration-150"
          disabled={isSubmitting}
        >
          Delete
        </button>
        <div>
          <p className="text-sm">{item.type}</p>
          <Link href={`/properties/${item?._id}`}>
            <h4 className="font-bold text-lg">{item.name}</h4>
          </Link>
          <p className="text-md">{item.description}</p>
        </div>

        <Gallery>
          <div className={`grid lg:grid-cols-3 grid-cols-2 gap-2 mt-2`}>
            {item?.images?.map((item, index) => {
              return (
                <Item
                  key={index}
                  original={item.secure_url}
                  thumbnail={item.secure_url}
                  width="1000"
                  height="565"
                >
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={item.secure_url}
                      alt=""
                      className="object-cover max-h-[400px] w-full mx-auto rounded-xl cursor-pointer"
                      width={0}
                      height={0}
                      sizes="100vw"
                      priority={true}
                    />
                  )}
                </Item>
              );
            })}
          </div>
        </Gallery>
      </article>
      <article
        className={`hidden md:flex relative rounded-xl shadow-xl px-4 py-6 flex-col justify-between gap-y-2 h-full ${
          magicNumbers.includes(index) ? `md:bg-slate-400 md:text-black` : ``
        }`}
      >
        <button
          onClick={() => {
            handleDeleteBookmars(item._id);
          }}
          className=" bg-red-600 rounded-lg py-2 px-4 hover:bg-red-700 absolute right-4 text-white disabled:bg-slate-300 disabled:text-black duration-150"
          disabled={isSubmitting}
        >
          Delete
        </button>
        <div>
          <p className="text-sm">{item.type}</p>
          <Link href={`/properties/${item?._id}`}>
            <h4 className="font-bold text-lg">{item.name}</h4>
          </Link>
          <p className="text-md">{item.description}</p>
        </div>

        <Gallery>
          <div className={`grid lg:grid-cols-3 grid-cols-2 gap-2 mt-2`}>
            {item?.images?.map((item, index) => {
              return (
                <Item
                  key={index}
                  original={item.secure_url}
                  thumbnail={item.secure_url}
                  width="1000"
                  height="565"
                >
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={item.secure_url}
                      alt=""
                      className="object-cover max-h-[400px] w-full mx-auto rounded-xl cursor-pointer"
                      width={0}
                      height={0}
                      sizes="100vw"
                      priority={true}
                    />
                  )}
                </Item>
              );
            })}
          </div>
        </Gallery>
      </article>
    </div>
  );
};

export default BookmarkCard;
