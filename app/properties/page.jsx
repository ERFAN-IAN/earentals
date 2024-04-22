import PropertiesGrid from "@/components/PropertiesGrid";
import SearchBox from "@/components/SearchBox";
export const dynamic = "force-dynamic";
const Page = async () => {
  return (
    <div>
      <div className="mt-8 pb-8">
        <SearchBox />
      </div>
      <PropertiesGrid />
    </div>
  );
};

export default Page;
