"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
const NavLink = ({ text, link, mobile, altLink }) => {
  const pathname = usePathname();
  if (link === "/properties" && pathname === "/properties/search") {
    return (
      <Link
        href={link}
        className={`${mobile || `btn`}
bg-primary testtextwhite  hoverdarkgreen
        `}
      >
        {text}
      </Link>
    );
  }
  return (
    <Link
      href={link}
      className={`${mobile || `btn`} ${
        pathname === `${link}` ? "bg-primary testtextwhite  hoverdarkgreen" : ""
      }`}
    >
      {text}
    </Link>
  );
};

export default NavLink;
