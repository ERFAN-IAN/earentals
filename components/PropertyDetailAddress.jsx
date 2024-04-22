import { FaMapMarkerAlt } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { formatPrice } from "@/utils/requests";
const PropertyDetailAddress = ({ property }) => {
  return (
    <section className="p-6 shadow-xl rounded-lg bg-primary text-base-100">
      <p>{property?.type}</p>
      <h1 className="font-bold text-2xl md:text-3xl mt-2 md:mt-4">
        {property?.name}
      </h1>
      <p className="flex items-center gap-x-1  mt-2 md:mt-4 ">
        <FaMapMarkerAlt />
        <span>{property?.location.street},</span>
        <span>{property?.location.city}</span>
        <span>{property?.location.state}</span>
      </p>
      <div className="flex flex-col items-center gap-y-4 md:grid md:grid-cols-3 mt-6 md:mt-10 md:justify-between max-w-[50rem] mx-auto font-bold">
        <p className="flex items-center gap-x-2 justify-center border-b-2 md:border-b-0 w-full pb-4">
          <span>Nightly</span>
          {property?.rates.nightly ? (
            formatPrice(property?.rates.nightly)
          ) : (
            <ImCross />
          )}
        </p>
        <p className="flex items-center gap-x-2 justify-center border-b-2 md:border-b-0 w-full pb-4">
          <span>Weekly</span>
          {property?.rates.weekly ? (
            formatPrice(property?.rates.weekly)
          ) : (
            <ImCross />
          )}
        </p>
        <p className="flex items-center gap-x-2 justify-center  w-full pb-4">
          <span>Monthly</span>
          {property?.rates.monthly ? (
            formatPrice(property?.rates.monthly)
          ) : (
            <ImCross />
          )}
        </p>
      </div>
    </section>
  );
};

export default PropertyDetailAddress;
