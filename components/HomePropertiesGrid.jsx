// import propeties from "@/properties.json";
import { fetchProperties } from "@/utils/requests";
import PropertiesCardGrid from "./PropertiesCardGrid";
import Btn from "./Btn";
const HomePropertiesGrid = async () => {
  const properties = await fetchProperties({ is_featured: true });
  return (
    <section>
      <h4 className=" text-center pb-8 mt-8 text-3xl font-bold text-base-content">
        Recent Properties
      </h4>
      <div
        className="grid sm:grid-cols-2 lg:grid-cols-3
    gap-4 gap-y-8"
      >
        {properties
          .toSorted(() => Math.random() - Math.random())
          .splice(0, 3)
          .map((item) => {
            return (
              <PropertiesCardGrid
                key={item?._id}
                title={item?.name}
                image={item?.images?.[0]?.secure_url}
                type={item?.type}
                location={item?.location}
                beds={item?.beds}
                baths={item?.baths}
                square_feet={item?.square_feet}
                rates={item?.rates}
                id={item?._id}
              />
            );
          })}
      </div>
      <div className="w-full flex justify-center mt-12">
        <Btn
          link={"/properties"}
          linkLabel={"View All Properties"}
          btnColor={"btn-secondary text-black w-full max-w-[26rem]"}
        />
      </div>
    </section>
  );
};

export default HomePropertiesGrid;
