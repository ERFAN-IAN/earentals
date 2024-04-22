import Image from "next/image";
import profile from "@/assets/images/profile.png";
const ProfileIdentity = ({ session }) => {
  return (
    <div className="grid grid-cols-1 md:flex md:gap-x-4 justify-center items-center w-full bg-[#60a5fa] text-black  rounded-xl py-6 px-4 mt-2">
      <div className="flex justify-center md:justify-normal min-w-24">
        <Image
          src={session?.image || profile}
          alt=""
          width={0}
          height={0}
          sizes="100vw"
          className="w-20  h-20  rounded-full border-4"
        />
      </div>
      <div>
        <p className="grid grid-cols-3 md:flex md:justify-start md:gap-x-2 justify-items-center mt-4 md:mt-0 font-semibold">
          <span className="font-bold mr-auto md:mr-0">Name: </span>
          <span className="">{session?.name}</span>
        </p>
        <p className="grid grid-cols-3 md:flex md:justify-start md:gap-x-2 justify-items-center mt-4 font-semibold">
          <span className="font-bold mr-auto md:mr-0">Email: </span>
          <span>{session?.email}</span>
        </p>
      </div>
    </div>
  );
};

export default ProfileIdentity;
