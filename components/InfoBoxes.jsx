import InfoBox from "./InfoBox";
const InfoBoxes = () => {
  return (
    <section className="py-8 flex justify-center">
      <div className="grid md:grid-cols-2 gap-y-8 gap-x-4 w-full max-w-[95%]">
        <InfoBox
          title={"For Renters"}
          des={
            "Find your dream rental property. Bookmark properties and contact owners."
          }
          link={"/properties"}
          linkLabel={"Browse Properties"}
          bgColor={"bg-secondary text-black"}
          titleColor={"text-base-100"}
        />
        <InfoBox
          title={"For Property Owners"}
          des={
            "List your properties and reach potential tenants. Rent short or long term."
          }
          link={"/properties/add"}
          linkLabel={"Add Property"}
          bgColor={"bg-primary text-base-100"}
        />
      </div>
    </section>
  );
};

export default InfoBoxes;
