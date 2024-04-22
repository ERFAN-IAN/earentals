import Link from "next/link";

const Btn = ({ btnColor, linkLabel, link }) => {
  return (
    <Link
      href={link}
      className={`rounded-lg py-2 px-4 btn ${btnColor} self-stretch sm:self-start `}
    >
      {linkLabel}
    </Link>
  );
};

export default Btn;
