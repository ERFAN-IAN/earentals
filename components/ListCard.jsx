"use client";
import Image from "next/image";
import Link from "next/link";

import { Gallery, Item } from "react-photoswipe-gallery";

import { useGlobalContext } from "@/context/context";
const ListCard = ({ property, tclass }) => {
  const { setIsDeleteModalOpen, setDeleteID } = useGlobalContext();
  return (
    <article
      className={`${tclass} rounded-xl shadow-xl px-4 py-6 flex flex-col justify-between gap-y-2 relative`}
    >
      <div>
        <p className="text-sm">{property.type}</p>
        <Link href={`/properties/${property?._id}`}>
          <h4 className="font-bold text-lg">{property.name}</h4>
        </Link>
        <p className="text-md">{property.description}</p>
      </div>

      <div>
        <Gallery>
          <div className={`grid lg:grid-cols-3 grid-cols-2 gap-2 mt-2`}>
            {property.images.map((item, index) => {
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
        <div className="flex justify-end gap-x-2 text-white mt-4">
          <Link
            href={`/profile/edit/${property._id}`}
            className="btn bg-blue-600 rounded-lg py-2 px-6 border-0 text-white hover:bg-blue-700"
          >
            Edit
          </Link>
          <button
            onClick={() => {
              setDeleteID(property._id);
              setIsDeleteModalOpen(true);
            }}
            className=" bg-red-600 rounded-lg py-2 px-4 hover:bg-red-700 duration-100"
          >
            Delete
          </button>
        </div>
      </div>
    </article>
  );
};

export default ListCard;
