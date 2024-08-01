import Hero from "@/components/Hero";
import HomePropertiesGrid from "@/components/HomePropertiesGrid";
import InfoBoxes from "@/components/InfoBoxes";
const page = async () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomePropertiesGrid />
    </>
  );
};

export default page;
