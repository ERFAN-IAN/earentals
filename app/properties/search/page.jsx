import SearchBox from "@/components/SearchBox";
import PropertiesGrid from "@/components/PropertiesGrid";
const page = () => {
  return (
    <div className="mt-8">
      <SearchBox />
      <div className="mt-8">
        <PropertiesGrid />
      </div>
    </div>
  );
};

export default page;
