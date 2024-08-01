import PropertiesGrid from "@/components/PropertiesGrid";
import SearchBox from "@/components/SearchBox";
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
