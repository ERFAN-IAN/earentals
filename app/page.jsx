import Hero from "@/components/Hero";
import HomePropertiesGrid from "@/components/HomePropertiesGrid";
import InfoBoxes from "@/components/InfoBoxes";
export const dynamic = "force-dynamic";
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
