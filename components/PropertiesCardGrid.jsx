import Image from "next/image";
import Link from "next/link";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { FaRulerCombined } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
const PropertiesCardGrid = ({
  title,
  image,
  type,
  location,
  beds,
  baths,
  square_feet,
  rates,
  id,
}) => {
  return (
    <Link
      href={`/properties/${id}`}
      className="card card-compact bg-base-100 shadow-xl relative"
    >
      <figure>
        <Image
          src={image}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
      </figure>
      <div className="absolute right-3 top-3 bg-base-100 px-4 py-2  font-semibold rounded-xl">
        {rates.monthly ? `$${rates.monthly}/mo` : `$${rates.weekly}/wk`}
      </div>
      <div className="card-body">
        <p>{type}</p>
        <h2 className="card-title mt-[-0.5rem] font-bold">{title}</h2>
        <div className="flex  justify-center gap-x-3 text-[1rem] mt-2">
          <div className="flex items-center gap-x-1">
            <span className="">
              <FaBed />
            </span>
            <span>{`${beds} Beds`}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <FaBath />
            <span>{`${baths} Baths`}</span>
          </div>
          <div className="flex items-center gap-x-1">
            <FaRulerCombined />
            <span>{`${square_feet} sqft`}</span>
          </div>
        </div>
        <div className="flex justify-center gap-x-6 text-[1rem] pb-6 border-b-2 border-base-300">
          {rates.nightly && (
            <span className="flex items-end gap-x-2">
              <FaMoneyBill />
              <span>Nightly</span>
            </span>
          )}
          {rates.weekly && (
            <span className="flex items-end gap-x-2">
              <FaMoneyBill />
              <span>Weekly</span>
            </span>
          )}

          {rates.monthly && (
            <span className="flex items-end gap-x-2">
              <FaMoneyBill />
              <span>Monthly</span>
            </span>
          )}
        </div>
        <div className="flex flex-row items-center">
          <p className="flex gap-x-1 items-center">
            <FaMapMarkerAlt />
            <span>{location.city}</span> <span>{location.state}</span>
          </p>
          <div className="card-actions justify-end mt-2">
            <button className="rounded-lg py-2 px-4 btn btn-primary text-base-100 self-stretch sm:self-start">
              Details
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default PropertiesCardGrid;
