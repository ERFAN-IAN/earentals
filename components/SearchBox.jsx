"use client";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
const SearchBox = () => {
  const router = useRouter();
  const searchParams = Object.fromEntries(useSearchParams());
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataObject = Object.fromEntries(formData);
    const queryString = `?search=${formDataObject?.search}&type=${formDataObject.type}`;
    router.push(`/properties/search${queryString}`);
  };
  return (
    <div className="flex flex-col w-full items-center justify-center">
      <form
        className="w-full flex flex-col sm:flex-row gap-y-4 sm:justify-center gap-x-2 "
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          type="search"
          placeholder="Enter Keywords or Location"
          className="w-full sm:max-w-[20rem] border-primary border-2 p-3 sm:py-0 focus:border-primary outline-none rounded-lg"
          name="search"
          defaultValue={searchParams.search || ""}
        />
        <select
          className="select select-primary w-full sm:max-w-[14rem] border-2 font-semibold focus:border-primary focus:outline-none outline-none rounded-lg"
          name="type"
          defaultValue={searchParams.type || "All"}
        >
          <option value="All">All</option>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="House">House</option>
          <option value="Cabin Or Cottage">Cabin or Cottage</option>
          <option value="Room">Room</option>
          <option value="Studio">Studio</option>
          <option value="Other">Other</option>
        </select>

        <button
          type="submit"
          className="btn btn-primary w-full sm:max-w-[6rem] text-base-100"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
