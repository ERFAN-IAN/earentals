"use client";
import Image from "next/image";

import { Gallery, Item } from "react-photoswipe-gallery";
const PropertyHeaderImage = ({ images }) => {
  return (
    <Gallery>
      <section className="w-full  overflow-x-scroll sm:overflow-visible rounded-lg">
        <div className=" w-full min-w-[500px]">
          {images?.length === 1 ? (
            <Item
              original={images?.[0]?.secure_url}
              thumbnail={images?.[0]?.secure_url}
              width="1000"
              height="565"
            >
              {({ ref, open }) => (
                <Image
                  ref={ref}
                  onClick={open}
                  src={images?.[0]?.secure_url}
                  alt=""
                  className="object-cover max-h-[400px] w-full mx-auto rounded-xl"
                  width={0}
                  height={0}
                  sizes="100vw"
                  priority={true}
                />
              )}
            </Item>
          ) : (
            <div className="grid grid-cols-10 h-full  gap-x-4 ">
              <div className="col-span-7  cursor-pointer rounded-xl shadow-xl hover:scale-[1.02] duration-200">
                <Item
                  original={images?.[0]?.secure_url}
                  thumbnail={images?.[0]?.secure_url}
                  width="1000"
                  height="565"
                >
                  {({ ref, open }) => (
                    <Image
                      ref={ref}
                      onClick={open}
                      src={images?.[0]?.secure_url}
                      alt=""
                      className="object-cover h-full max-h-[400px] w-full rounded-xl"
                      width={0}
                      height={0}
                      sizes="100vw"
                      priority={true}
                    />
                  )}
                </Item>
              </div>
              <div className="col-span-3 grid grid-rows-2 h-full max-h-[400px] gap-y-4 ">
                {images?.map((image, index) => {
                  if (index === 0) {
                    return;
                  }
                  return (
                    <div
                      key={index}
                      className="row-span-1 cursor-pointer hover:scale-[1.02] duration-200"
                    >
                      <Item
                        original={image?.secure_url}
                        thumbnail={image?.secure_url}
                        width="1000"
                        height="565"
                      >
                        {({ ref, open }) => (
                          <Image
                            ref={ref}
                            onClick={open}
                            src={image?.secure_url}
                            alt=""
                            className="object-cover  h-full  w-full rounded-xl shadow-xl"
                            width={0}
                            height={0}
                            sizes="100vw"
                            priority={true}
                          />
                        )}
                      </Item>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </Gallery>
    // <section className="grid grid-cols-10 grid-rows-2 gap-4 rounded-lg h-[400px]">
    //   <img
    //     src={`/Images/${image[0]}`}
    //     alt=""
    //     className=" col-span-7 row-span-2 rounded-lg h-[400px] w-full object-cover"
    //   />
    //   <div className="grid col-span-3 row-span-2 grid-rows-2 gap-y-4">
    //     {image.map((item, index) => {
    //       if (index === 0) {
    //         return;
    //       }
    //       return (
    //         <img
    //           src={`/Images/${item}`}
    //           className="rounded-lg  w-full object-cover row-span-1 h-full"
    //         />
    //       );
    //     })}
    //   </div>
    // </section>
    // <section className=" shadow-xl rounded-lg">
    //   <div className="h-[400px]">
    //     <Image
    //       src={`/Images/${image}`}
    //       alt=""
    //       width={0}
    //       height={0}
    //       sizes={`100vw`}
    //       className=" h-[400px] w-full object-cover rounded-t-lg"
    //     />
    //   </div>

    //   <div className="py-6 pl-2">
    //     <Link href={"/properties"} className="flex items-center gap-2 text-md">
    //       <FaArrowLeftLong />
    //       Back to Properties
    //     </Link>
    //   </div>
    // </section>
  );
};

export default PropertyHeaderImage;
