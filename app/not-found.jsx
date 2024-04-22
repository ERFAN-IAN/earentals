"use client";
import Btn from "@/components/Btn";
const Nt = () => {
  return (
    <main className="h-screen w-full flex flex-col justify-center items-center">
      <div className="mb-[13rem] flex flex-col justify-center items-center">
        <h1 className="text-9xl font-extrabold tracking-widest">404</h1>
        <div className="bg-primary px-2 text-sm rounded rotate-12 absolute text-base-100">
          Page Not Found
        </div>
        <button className="mt-5">
          <Btn
            link={"/"}
            linkLabel={"Home"}
            btnColor={"btn-primary text-base-100 w-full max-w-[26rem]"}
          />
        </button>
      </div>
    </main>
  );
};

export default Nt;
