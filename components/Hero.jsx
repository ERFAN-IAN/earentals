import SearchBox from "./SearchBox";
const Hero = () => {
  return (
    <section className="flex flex-col justify-center items-center py-10 border-b-2 border-base-300 pb-16 w-full">
      <div className="w-[90%] flex flex-col items-center">
        <div className="max-w-[80rem]">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-extrabold mt-6 text-center tracking-normal">
            Find The Perfect Rental
          </h1>
          <p className="my-4 text-xl text-center">
            Discover the perfect property that suits your needs
          </p>
        </div>
        <div className="mt-3 w-full">
          <SearchBox />
        </div>
      </div>
    </section>
  );
};

export default Hero;
