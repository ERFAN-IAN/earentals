"use client";
import { CgMenuLeftAlt } from "react-icons/cg";
import { TfiHome } from "react-icons/tfi";
import { FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import profile from "@/assets/images/profile.png";
import { usePathname } from "next/navigation";
import NavLink from "./NavLink";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import ThemeSwitch from "./ThemeSwitch";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [providers, setProviders] = useState(false);
  const [theme, setTheme] = useState("dark");
  useEffect(() => {
    const letsGetProviders = async () => {
      const fetchedProviders = await getProviders();
      setProviders(fetchedProviders);
    };
    letsGetProviders();
  }, []);

  return (
    <div className="navbar grid grid-cols-3 md:grid-cols-4 py-6 px-0 layoutclamp">
      <div className="md:col-span-3">
        <div className=" md:flex text-center items-center justify-center hidden gap-x-4">
          <Link href={"/"} className="flex  gap-x-4">
            <div className="text-2xl  bg-white text-gray-600  rounded-full w-10 h-10 items-center justify-center flex">
              <TfiHome />
            </div>

            <h1 className=" self-center font-bold text-2xl w-32">EA Rentals</h1>
          </Link>
          <NavLink text={"Home"} link={"/"} />
          <NavLink
            text={"Properties"}
            link={"/properties"}
            altLink={"/properties/search"}
          />
          {session && providers ? (
            <NavLink text={"Add Property"} link={"/properties/add"} />
          ) : null}
        </div>
        <div className="dropdown md:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle text-xl"
          >
            <CgMenuLeftAlt />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li
              className={` ${
                pathname === "/" && " bg-primary   hoverdarkgreen rounded-lg"
              }`}
            >
              <NavLink text={"Home"} link={"/"} mobile={true} />
            </li>
            <li
              className={` ${
                pathname === "/properties" || pathname === "/properties/search"
                  ? " bg-primary   hoverdarkgreen rounded-lg"
                  : ""
              }`}
            >
              <NavLink text={"Properties"} link={"/properties"} mobile={true} />
            </li>
            {providers && session ? (
              <li
                className={` ${
                  pathname === "/properties/add" &&
                  " bg-primary   hoverdarkgreen rounded-lg"
                }`}
              >
                <NavLink
                  text={"Add Property"}
                  link={"/properties/add"}
                  mobile={true}
                />
              </li>
            ) : (
              <div>
                {Object.values(providers).map((item, index) => {
                  return (
                    <li onClick={() => signIn(item.id)} key={index}>
                      <a>Login or Register</a>
                    </li>
                  );
                })}
              </div>
            )}
          </ul>
        </div>
      </div>
      <div className=" ml-auto mr-auto md:hidden">
        <div className="text-2xl rounded-full w-10 h-10 bg-white text-gray-600 flex text-center items-center justify-center md:hidden">
          <Link href={"/"}>
            <TfiHome />
          </Link>
        </div>
      </div>
      <div className="ml-auto">
        {session ? (
          <>
            <button className="btn btn-ghost btn-circle">
              <div className="indicator ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                <span className="badge badge-xs badge-primary indicator-item mr-1 mt-1"></span>
              </div>
            </button>
            <div className="dropdown dropdown-bottom dropdown-end">
              <button className="btn btn-ghost btn-circle">
                <Image
                  src={session?.user?.image || profile}
                  alt=""
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="h-8 w-8 rounded-full"
                />
              </button>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li
                  className={`${
                    pathname === `/profile`
                      ? `bg-primary rounded-lg testtextwhite hoverdarkgreen`
                      : ``
                  }`}
                >
                  <Link href={"/profile"}>Your Profile</Link>
                </li>
                <li
                  className={`${
                    pathname === `/saved`
                      ? `bg-primary rounded-lg testtextwhite hoverdarkgreen`
                      : ``
                  }`}
                >
                  <Link href={"/saved"}>Saved Properties</Link>
                </li>
                {session && (
                  <li onClick={() => signOut()}>
                    <a>Sign Out</a>
                  </li>
                )}
                <li className="flex justify-start flex-row mr-2">
                  <ThemeSwitch />
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <li className="flex justify-start flex-row mr-2">
              {providers && (
                <label className="swap swap-rotate">
                  <ThemeSwitch place={"nav"} />
                </label>
              )}
            </li>

            {Object.values(providers).map((item, index) => {
              return (
                <button
                  className="btn hidden md:flex"
                  onClick={() => signIn(item.id)}
                  key={index}
                >
                  <FaGoogle />
                  Login or Register
                </button>
              );
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
