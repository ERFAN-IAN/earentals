import { FaCheck } from "react-icons/fa";
const Amenities = ({ property }) => {
  return (
    <section className="p-6 shadow-xl rounded-lg bg-primary text-base-100">
      <h4 className="font-bold text-xl">Amenities</h4>
      <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 mt-8">
        {property?.amenities.map((item) => {
          return (
            <p className="flex items-center gap-2" key={item}>
              <FaCheck />
              {item}
            </p>
          );
        })}
      </div>
    </section>
  );
};

export default Amenities;
