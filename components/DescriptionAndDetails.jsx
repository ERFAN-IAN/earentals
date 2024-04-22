import { FaRulerCombined } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
const DescriptionAndDetails = ({ property }) => {
  return (
    <section className="shadow-xl flex flex-col items-center rounded-lg p-6 bg-secondary text-black">
      <h4 className="font-bold text-lg mr-auto">Description & Details</h4>
      <div className="flex justify-center gap-4  mb-4 text-xl space-x-9 mt-8">
        <p className="flex items-center gap-x-2">
          <FaBed />
          {property?.beds}
          <span className="hidden sm:inline">Beds</span>
        </p>
        <p className="flex items-center gap-x-2">
          <FaBath />
          {property?.baths}
          <span className="hidden sm:inline">Baths</span>
        </p>

        <p className="flex items-center gap-x-2">
          <FaRulerCombined />
          {property?.square_feet}
          <span className="hidden sm:inline">sqft</span>
        </p>
      </div>
      <p>{property?.description}</p>
    </section>
  );
};

export default DescriptionAndDetails;
